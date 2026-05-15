"use client";

import { I18N } from "./i18n";
import { PayloadScenarioPage } from "../PayloadScenarioPage";

const ProfileRenderingXssPage = () => (
  <PayloadScenarioPage slug="profile-rendering-xss" i18n={I18N} />
);

export default ProfileRenderingXssPage;
