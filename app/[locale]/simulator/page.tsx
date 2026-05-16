import { XssSimulationBoard } from "@/features/xss-simulation";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/types";

interface ISimulatorPageProps {
  params: { locale?: string };
}

const pickLocale = (raw: unknown): Locale =>
  typeof raw === "string" && LOCALES.includes(raw as Locale)
    ? (raw as Locale)
    : DEFAULT_LOCALE;

const SimulatorPage = ({ params }: ISimulatorPageProps) => (
  <XssSimulationBoard locale={pickLocale(params.locale)} />
);

export default SimulatorPage;
