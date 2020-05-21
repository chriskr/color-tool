import React, { FormEvent, useState, FunctionComponent } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Color from "color-interfaces";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    background: hsl(0, 0%, 95%);
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
  }

  html {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 70px;
  }

  h1,
  h2,
  h3 {
    font-weight: 300;
    font-size: 1em;
  }

  h1 {
    background-image: url('http://chriskr.github.io/home/wiking.svg');
    background-repeat: no-repeat;
    background-position: 0 100px;
    background-size: 70px;
    margin: 0;
    padding: 20px 0 120px 0;
    font-size: 50px;
    font-weight: 100;
  }
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
`;

const ControlsContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
`;

const ControlsColorSpace = styled.div`
  padding: 8px 16px;
  input {
    font: inherit;
  }
  input:active,
  input:focus {
    outline: none;
  }
  input[type="range"] {
    width: 600px;
    height: 24px;
    -webkit-appearance: none;
    margin: 6px 0;
  }
  input[type="number"],
  input[type="text"] {
    border: none;
    padding: 0 2px;
    margin: 0 0 0 16px;
    background: transparent;
  }
  input[type="number"] {
    margin-left: 12px;
    width: 4em;
  }
  input[type="text"] {
    margin-left: 1px;
    width: 6em;
  }
  textarea {
    resize: none;
    border: none;
  }
`;

const ColorSpaceTitle = styled.h3`
  margin: -8px -16px 8px -16px;
  padding: 8px 16px;
  background-color: hsl(0, 0%, 85%);
`;

const ControlRow = styled.div`
  display: flex;
  align-items: center;

  label {
    min-width: 96px;
  }
`;

const ExampleColor = styled.div`
  display: flex;
  width: 150px;
  flex-direction: column;
  padding: 36px;
  position: relative;
`;

const RepoLink = styled.a`
  display: block;
  background-image: url("http://chriskr.github.io/cv/github.svg");
  background-repeat: no-repeat;
  background-position: 0 50%;
  background-size: 20px;
  padding-left: 32px;
  height: 24px;
  line-height: 20px;
  margin-top: 20px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  position: absolute;
  bottom: -36px;
  left: 0;
  color: black;
`;

const DisplayColor: FunctionComponent<{
  color: Color;
}> = ({ color, children }) => {
  const isDark = color.getLuminance() < 0.35;
  const style = {
    backgroundColor: color.rgb.toCss(),
    color: isDark ? "white" : "black",
  };
  return (
    <ExampleColor style={style}>
      <h2>color sample</h2>
      <div>{color.hex.toCss()}</div>
      <div>{color.rgb.toCss()}</div>
      <div>{color.hsl.toCss()}</div>
      {children}
    </ExampleColor>
  );
};

const setters: Object & Record<string, (color: Color, v: any) => void> = {
  red: (color: Color, v: number) => (color.rgb.r = v),
  green: (color: Color, v: number) => (color.rgb.g = v),
  blue: (color: Color, v: number) => (color.rgb.b = v),
  redValue: (color: Color, v: number) => (color.rgb.r = v),
  greenValue: (color: Color, v: number) => (color.rgb.g = v),
  blueValue: (color: Color, v: number) => (color.rgb.b = v),

  hue: (color: Color, v: number) => (color.hsv.h = v),
  saturation: (color: Color, v: number) => (color.hsv.s = v / 100),
  value: (color: Color, v: number) => (color.hsv.v = v / 100),
  hueValue: (color: Color, v: number) => (color.hsv.h = v),
  saturationValue: (color: Color, v: number) => (color.hsv.s = v / 100),
  valueValue: (color: Color, v: number) => (color.hsv.v = v / 100),

  hueL: (color: Color, v: number) => (color.hsl.h = v),
  saturationL: (color: Color, v: number) => (color.hsl.s = v / 100),
  lightness: (color: Color, v: number) => (color.hsl.l = v / 100),
  hueLValue: (color: Color, v: number) => (color.hsl.h = v),
  saturationLValue: (color: Color, v: number) => (color.hsl.s = v / 100),
  lightnessValue: (color: Color, v: number) => (color.hsl.l = v / 100),

  hex: (color: Color, v: string) => color.hex.set(v),
};

const getters: Object & Record<string, (color: Color) => string | number> = {
  red: (color: Color) => color.rgb.r,
  green: (color: Color) => color.rgb.g,
  blue: (color: Color) => color.rgb.b,
  redValue: (color: Color) => color.rgb.r,
  greenValue: (color: Color) => color.rgb.g,
  blueValue: (color: Color) => color.rgb.b,

  hue: (color: Color) => Math.round(color.hsv.h),
  saturation: (color: Color) => Math.round(color.hsv.s * 100),
  value: (color: Color) => Math.round(color.hsv.v * 100),
  hueValue: (color: Color) => Math.round(color.hsv.h),
  saturationValue: (color: Color) => Math.round(color.hsv.s * 100),
  valueValue: (color: Color) => Math.round(color.hsv.v * 100),

  hueL: (color: Color) => Math.round(color.hsl.h),
  saturationL: (color: Color) => Math.round(color.hsl.s * 100),
  lightness: (color: Color) => Math.round(color.hsl.l * 100),
  hueLValue: (color: Color) => Math.round(color.hsl.h),
  saturationLValue: (color: Color) => Math.round(color.hsl.s * 100),
  lightnessValue: (color: Color) => Math.round(color.hsl.l * 100),

  hex: (color: Color) => color.hex.get(),
};

const getOnInput = (
  color: Color,
  setColor: React.Dispatch<React.SetStateAction<Color>>
) => (event: FormEvent<HTMLFormElement>) => {
  const { target, currentTarget } = event;

  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  const setter = setters[target.id];
  const value = Number.parseInt(target.value);

  if (!(setter && Number.isFinite(value))) {
    return;
  }

  setter(color, value);

  Array.from(currentTarget.elements).forEach((input) => {
    if (
      input instanceof HTMLInputElement &&
      input !== target &&
      getters.hasOwnProperty(input.id)
    ) {
      input.value = `${getters[input.id](color)}`;
    }
  });

  setColor(color.copy());
};

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

const c = new Color();

type CA = [number, number, number];

type GetLineraGradientArgs = {
  direction?: string;
  colorStops: CA[];
  colorInterface: typeof c.rgb | typeof c.hsl | typeof c.hsv;
};

type GetLineraGradient = (options: GetLineraGradientArgs) => string;

const getLineraGradient: GetLineraGradient = ({
  direction = "90deg",
  colorStops,
  colorInterface,
}) => {
  const step = 1 / (colorStops.length - 1);
  return `linear-gradient(${[
    direction,
    ...colorStops.map((colorStop, index) => {
      colorInterface.set(colorStop);
      return `${colorInterface.toCss()} ${Math.round(index * step * 100)}%`;
    }),
  ].join(", ")})`;
};

const getStyleDeclarations = (color: Color) => {
  const c = new Color();
  return `
    #red {
      background: ${getLineraGradient({
        colorStops: [
          [0, color.rgb.g, color.rgb.b],
          [255, color.rgb.g, color.rgb.b],
        ],
        colorInterface: c.rgb,
      })};
    }

    #green {
      background: ${getLineraGradient({
        colorStops: [
          [color.rgb.r, 0, color.rgb.b],
          [color.rgb.r, 255, color.rgb.b],
        ],
        colorInterface: c.rgb,
      })};
    }

    #blue {
      background: ${getLineraGradient({
        colorStops: [
          [color.rgb.r, color.rgb.g, 0],
          [color.rgb.r, color.rgb.g, 255],
        ],
        colorInterface: c.rgb,
      })};
    }

    #hue {
      background: ${getLineraGradient({
        colorStops: [
          [0, color.hsv.s, color.hsv.v],
          [60, color.hsv.s, color.hsv.v],
          [120, color.hsv.s, color.hsv.v],
          [180, color.hsv.s, color.hsv.v],
          [240, color.hsv.s, color.hsv.v],
          [300, color.hsv.s, color.hsv.v],
          [360, color.hsv.s, color.hsv.v],
        ],
        colorInterface: c.hsv,
      })};
    }

    #saturation {
      background: ${getLineraGradient({
        colorStops: [
          [color.hsv.h, 0, color.hsv.v],
          [color.hsv.h, 1, color.hsv.v],
        ],
        colorInterface: c.hsv,
      })};
    }

    #value {
      background: ${getLineraGradient({
        colorStops: [
          [color.hsv.h, color.hsv.s, 0],
          [color.hsv.h, color.hsv.s, 1],
        ],
        colorInterface: c.hsv,
      })};
    }

    #hueL {
      background: ${getLineraGradient({
        colorStops: [
          [0, color.hsl.s, color.hsl.l],
          [60, color.hsl.s, color.hsl.l],
          [120, color.hsl.s, color.hsl.l],
          [180, color.hsl.s, color.hsl.l],
          [240, color.hsl.s, color.hsl.l],
          [300, color.hsl.s, color.hsl.l],
          [360, color.hsl.s, color.hsl.l],
        ],
        colorInterface: c.hsl,
      })};
    }

    #saturationL {
      background: ${getLineraGradient({
        colorStops: [
          [color.hsl.h, 0, color.hsl.l],
          [color.hsl.h, 1, color.hsl.l],
        ],
        colorInterface: c.hsl,
      })};
    }

    #lightness {
      background: ${getLineraGradient({
        colorStops: [
          [color.hsl.h, color.hsl.s, 0],
          [color.hsl.h, color.hsl.s, 0.5],
          [color.hsl.h, color.hsl.s, 1],
        ],
        colorInterface: c.hsl,
      })};
    }
  `;
};

const App = () => {
  const [color, setColor] = useState(new Color([127, 127, 127]));

  return (
    <>
      <GlobalStyle />
      <h1>color converter</h1>
      <style>{getStyleDeclarations(color)}</style>
      <MainContent>
        <ControlsContainer
          onInput={getOnInput(color, setColor)}
          onSubmit={handleSubmit}
        >
          <ControlsColorSpace>
            <ColorSpaceTitle>hex</ColorSpaceTitle>
            <ControlRow>
              <label>hex</label>
              <span>#</span>
              <input
                type="text"
                id="hex"
                defaultValue={color.hex.get()}
                spellCheck={false}
              />
            </ControlRow>
          </ControlsColorSpace>

          <ControlsColorSpace>
            <ColorSpaceTitle>rgb</ColorSpaceTitle>
            <ControlRow>
              <label>red</label>
              <input
                type="range"
                id="red"
                min="0"
                max="255"
                defaultValue={color.rgb.r}
              />
              <input
                type="number"
                id="redValue"
                min="0"
                max="255"
                defaultValue={color.rgb.r}
              />
            </ControlRow>
            <ControlRow>
              <label>green</label>
              <input
                type="range"
                id="green"
                min="0"
                max="255"
                defaultValue={color.rgb.g}
              />
              <input
                type="number"
                id="greenValue"
                min="0"
                max="255"
                defaultValue={color.rgb.b}
              />
            </ControlRow>
            <ControlRow>
              <label>blue</label>
              <input
                type="range"
                id="blue"
                min="0"
                max="255"
                defaultValue={color.rgb.b}
              />
              <input
                type="number"
                id="blueValue"
                min="0"
                max="255"
                defaultValue={color.rgb.b}
              />
            </ControlRow>
          </ControlsColorSpace>

          <ControlsColorSpace>
            <ColorSpaceTitle>hsv</ColorSpaceTitle>
            <ControlRow>
              <label>hue</label>
              <input
                type="range"
                id="hue"
                min="0"
                max="360"
                defaultValue={getters.hue(color)}
              />
              <input
                type="number"
                id="hueValue"
                min="0"
                max="360"
                defaultValue={getters.hue(color)}
              />
            </ControlRow>
            <ControlRow>
              <label>saturation</label>
              <input
                type="range"
                id="saturation"
                min="0"
                max="100"
                defaultValue={getters.saturation(color)}
              />
              <input
                type="number"
                id="saturationValue"
                min="0"
                max="100"
                defaultValue={getters.saturation(color)}
              />
            </ControlRow>
            <ControlRow>
              <label>value</label>
              <input
                type="range"
                id="value"
                min="0"
                max="100"
                defaultValue={getters.value(color)}
              />
              <input
                type="number"
                id="valueValue"
                min="0"
                max="100"
                defaultValue={getters.value(color)}
              />
            </ControlRow>
          </ControlsColorSpace>

          <ControlsColorSpace>
            <ColorSpaceTitle>hsl</ColorSpaceTitle>
            <ControlRow>
              <label>hue</label>
              <input
                type="range"
                id="hueL"
                min="0"
                max="360"
                defaultValue={getters.hueL(color)}
              />
              <input
                type="number"
                id="hueLValue"
                min="0"
                max="360"
                defaultValue={getters.hueL(color)}
              />
            </ControlRow>
            <ControlRow>
              <label>saturation</label>
              <input
                type="range"
                id="saturationL"
                min="0"
                max="100"
                defaultValue={getters.saturationL(color)}
              />
              <input
                type="number"
                id="saturationLValue"
                min="0"
                max="100"
                defaultValue={getters.saturationL(color)}
              />
            </ControlRow>
            <ControlRow>
              <label>lightness</label>
              <input
                type="range"
                id="lightness"
                min="0"
                max="100"
                defaultValue={getters.lightness(color)}
              />
              <input
                type="number"
                id="lightnessValue"
                min="0"
                max="100"
                defaultValue={getters.lightness(color)}
              />
            </ControlRow>
          </ControlsColorSpace>
        </ControlsContainer>
        <DisplayColor color={color}>
          <RepoLink href="https://github.com/chriskr/color-tool">
            color-tool
          </RepoLink>
        </DisplayColor>
      </MainContent>
    </>
  );
};

export default App;
