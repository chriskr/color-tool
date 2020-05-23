import React, { useState } from 'react';
import Color from 'color-interfaces';
import { getters, getOnInput, handleSubmit } from './utils';
import {
  GlobalStyle,
  Header,
  MainContent,
  ControlsContainer,
  ControlsColorSpace,
  ColorSpaceTitle,
  ControlsBlock,
  ControlRow,
  RepoLink,
  DisplayColor,
  GradientStyle,
} from './atoms';

const App = () => {
  const [color, setColor] = useState(new Color([127, 127, 127]));

  return (
    <>
      <GlobalStyle />
      <Header>
        <h1>color tool</h1>
        <DisplayColor color={color}></DisplayColor>
      </Header>
      <GradientStyle color={color} />
      <MainContent>
        <ControlsContainer
          onInput={getOnInput(color, setColor)}
          onSubmit={handleSubmit}
        >
          <ControlsColorSpace>
            <ColorSpaceTitle></ColorSpaceTitle>
            <ControlsBlock>
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
            </ControlsBlock>
          </ControlsColorSpace>

          <ControlsColorSpace>
            <ColorSpaceTitle>rgb</ColorSpaceTitle>
            <ControlsBlock>
              <ControlRow>
                <label>red</label>
                <div>
                  <input
                    type="range"
                    id="red"
                    min="0"
                    max="255"
                    defaultValue={color.rgb.r}
                  />
                </div>
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
            </ControlsBlock>
          </ControlsColorSpace>

          <ControlsColorSpace>
            <ColorSpaceTitle>hsv</ColorSpaceTitle>
            <ControlsBlock>
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
            </ControlsBlock>
          </ControlsColorSpace>

          <ControlsColorSpace>
            <ColorSpaceTitle>hsl</ColorSpaceTitle>
            <ControlsBlock>
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
            </ControlsBlock>
          </ControlsColorSpace>

          <ControlsColorSpace>
            <ColorSpaceTitle></ColorSpaceTitle>
            <ControlsBlock>
              <ControlRow>
                <label>alpha</label>
                <input
                  type="range"
                  id="alpha"
                  min="0"
                  max="100"
                  defaultValue={getters.alpha(color)}
                />
                <input
                  type="number"
                  id="alphaValue"
                  min="0"
                  max="100"
                  defaultValue={getters.alpha(color)}
                />
              </ControlRow>
            </ControlsBlock>
          </ControlsColorSpace>
        </ControlsContainer>
      </MainContent>
      <RepoLink href="https://github.com/chriskr/color-tool">
        color-tool
      </RepoLink>
    </>
  );
};

export default App;
