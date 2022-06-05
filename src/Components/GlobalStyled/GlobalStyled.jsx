/* GlobalStyle.jsx */
import { createGlobalStyle} from 'styled-components';
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle `
${normalize} // normalize

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: var(--pink)
}

:root {
    --purple: #8e44ad;
    --grey: #bdc3c7;
    --yellow: #fff200;
    --pink: #ffcccc;
    --orange: #ff9f1a;
    --white: #fff;
    --black: #000;
}
`;

export default GlobalStyle;