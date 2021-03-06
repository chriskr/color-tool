import React, { FunctionComponent } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Color, { ColorType } from 'color-interfaces';
import { getStyleDeclarations } from './utils';
import wiking from './wiking.svg';
import dot from './dot.svg';
import github from './github.svg';
import bg2 from './bg2.svg';

export const GlobalStyle = createGlobalStyle`
html,
body {
  color: hsl(0, 0%, 75%);
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  background-image: linear-gradient(0deg, hsl(0, 0%, 10%), hsl(0, 0%, 25%));
}

body {
  height: 100%;

}

#root {
  height: 100%;
  overflow: auto;

}

h1,
h2,
h3 {
  font-weight: 300;
  font-size: 1em;
}

h1 {
  margin: 0;
  padding: 0;
  font-size: 90px;
  font-weight: 100;
  color: hsl(0, 0%, 35%);
}

`;

export const Wrapper = styled.div`
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  box-sizing: border-box;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px 0 250px;
  background-image: url(${wiking});
  background-repeat: no-repeat;
  background-position: 35px 50%;
  background-size: 85px;
`;

export const MainContent = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;

export const ControlsContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
`;

export const ControlsColorSpace = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: row;
  input {
    font: inherit;
    color: inherit;
  }
  input:active,
  input:focus {
    outline: none;
  }
  input[type='range'] {
    width: 720px;
    height: 21px;
    -webkit-appearance: none;
    margin: 6px -6px;
    background-color: transparent;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.05) 0,
      rgba(255, 255, 255, 0.05) 100%
    );
    background-size: 708px;
    background-repeat: no-repeat;
    background-position: 6px 0;
  }

  input[type='range']::-webkit-slider-thumb {
    margin: 0;
    -webkit-appearance: none;
    height: 36px;
    width: 12px;
    background: transparent;
    background-image: url(${dot});
    background-repeat: no-repeat;
    background-position: 50% 100%;
    opacity: 0.3;
  }

  input[type='range']:hover::-webkit-slider-thumb {
    opacity: 1;
  }

  input[type='range']::-moz-range-thumb {
    margin: 0;
    -webkit-appearance: none;
    height: 36px;
    width: 12px;
    background: transparent;
    background-image: url(${dot});
    background-repeat: no-repeat;
    background-position: 50% 100%;
    opacity: 0.3;
    border: none;
    border-radius: none;
  }

  input[type='range']:hover::-moz-range-thumb {
    opacity: 1;
  }
  input[type='number'],
  input[type='text'] {
    border: none;
    padding: 0 2px;
    margin: 0 0 0 16px;
    background: transparent;
  }
  input[type='number'] {
    margin-left: 12px;
    width: 68px;
  }
  input[type='text'] {
    margin-left: 1px;
    width: 6em;
  }
  textarea {
    resize: none;
    border: none;
  }
  /*
opacity: 0;
transition: opacity 0.5s;
&:hover {
  opacity: 1;
}
*/
`;

export const ColorSpaceTitle = styled.h3`
  margin: 0;
  padding: 0;
  width: 140px;
  font-size: 90px;
  font-weight: 100;
  display: flex;
  align-items: center;
  color: hsl(0, 0%, 35%);
`;

export const ControlsBlock = styled.div``;

export const ControlRow = styled.div`
  display: flex;
  align-items: center;

  label {
    width: 100px;
    text-align: right;
    padding-right: 12px;
  }
`;

export const ExampleColor = styled.div`
  display: flex;
  width: 170px;
  padding: 18px 36px;
  flex-direction: column;
  position: relative;
  white-space: nowrap;
  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background-image: url(${bg2});
  }
`;

export const RepoLink = styled.a`
  display: block;
  background-image: url(${github});
  background-repeat: no-repeat;
  background-position: 0 50%;
  background-size: 20px;
  padding-left: 32px;
  height: 24px;
  line-height: 24px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  /*
position: absolute;
bottom: -36px;
left: 0;
*/
  color: inherit;
  float: right;
  width: 68px;
`;

export const DisplayColor: FunctionComponent<{
  color: Color;
}> = ({ color }) => {
  const adjustColor = color
    .copy()
    .mixWithColor(new Color([0, 0, 0.95], ColorType.HSL), 1 - color.alpha);
  const isDark = adjustColor.getLuminance() < 0.35;
  const style = {
    backgroundColor: color.rgba.toCss(),
    color: isDark ? 'white' : 'black',
  };
  return (
    <ExampleColor style={style}>
      <div>{color.hex.toCss()}</div>
      <div>{color.rgb.toCss()}</div>
      <div>{color.hsl.toCss()}</div>
      <div>{color.hexa.toCss()}</div>
      <div>{color.rgba.toCss()}</div>
      <div>{color.hsla.toCss()}</div>
    </ExampleColor>
  );
};

export const GradientStyle: FunctionComponent<{
  color: Color;
}> = ({ color }) => <style>{getStyleDeclarations(color)}</style>;
