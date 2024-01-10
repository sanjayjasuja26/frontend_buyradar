import { useTranslation } from "react-i18next";

const TranslatedText = ({ text }: { text: string }) => {
  const { t } = useTranslation();
  return <>{t(text)}</>;
};

export default TranslatedText;
