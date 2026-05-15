import {
  createScenarioLayout,
  createScenarioMetadata,
} from "../ScenarioSeoLayout";

export const generateMetadata = createScenarioMetadata(
  "file-upload-preview-xss",
);

export default createScenarioLayout("file-upload-preview-xss");
