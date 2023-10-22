export const convertLanguage = (text: [], languageType = "ko"): any => {
  let data;
  if (text.length >= 1) {
    data = text?.find(
      (name: any) =>
        name.language.name === (languageType !== "ko" ? languageType : "ko")
    );
  }
  return data;
};
