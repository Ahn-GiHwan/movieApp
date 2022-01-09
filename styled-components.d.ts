import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    mainBgColor: "string";
    textColor: "string";
  }
  export interface darkTheme {
    mainBgColor: "string";
    textColor: "string";
  }
  export interface lightTheme {
    mainBgColor: "string";
    textColor: "string";
  }
}
