// https://stackoverflow.com/questions/64489395/converting-snake-case-string-to-title-case.

export const capitalize = (s) =>
  s.replace (/^[-_]*(.)/, (_, c) => c.toUpperCase())
   .replace (/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase())
