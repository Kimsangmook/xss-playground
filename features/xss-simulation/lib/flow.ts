import type {
  IFlowEdge,
  IFlowToggles,
  IPoint,
  ISimWindow,
  WindowId,
} from "../model/types";

export const getFlowEdges = (toggles: IFlowToggles): IFlowEdge[] => {
  if (!toggles.serverRender) {
    return toggles.dbSave
      ? [
          { from: "attacker", to: "database", label: "store" },
          { from: "database", to: "client", label: "fetch" },
        ]
      : [{ from: "attacker", to: "client", label: "sink" }];
  }

  if (toggles.dbSave) {
    return [
      { from: "attacker", to: "database", label: "store" },
      { from: "database", to: "server", label: "load" },
      { from: "server", to: "client", label: "html" },
    ];
  }

  return [
    { from: "attacker", to: "server", label: "request" },
    { from: "server", to: "client", label: "html" },
  ];
};

export const getInactiveWindows = (toggles: IFlowToggles): Set<WindowId> => {
  const inactive = new Set<WindowId>();
  if (!toggles.dbSave) inactive.add("database");
  if (!toggles.serverRender) inactive.add("server");
  return inactive;
};

export const getAnchor = (win: ISimWindow, target: ISimWindow): IPoint => {
  const cx = win.x + win.width / 2;
  const cy = win.y + win.height / 2;
  const tx = target.x + target.width / 2;
  const ty = target.y + target.height / 2;
  const dx = tx - cx;
  const dy = ty - cy;

  if (Math.abs(dx) > Math.abs(dy)) {
    return { x: dx > 0 ? win.x + win.width : win.x, y: cy };
  }

  return { x: cx, y: dy > 0 ? win.y + win.height : win.y };
};

export const buildPath = (from: IPoint, to: IPoint) => {
  const midX = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
};

export const midpoint = (from: IPoint, to: IPoint): IPoint => ({
  x: (from.x + to.x) / 2,
  y: (from.y + to.y) / 2,
});
