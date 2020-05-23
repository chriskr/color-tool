import React, { FormEvent } from 'react';
import Color, {
  RGBInterface,
  HSVInterface,
  HSLInterface,
  RGB,
  HSL,
  HSV,
  RGBAInterface,
  RGBA,
} from 'color-interfaces';
import bg2 from './bg2.svg';

export const setters: Object &
  Record<string, (color: Color, v: any) => void> = {
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

  alpha: (color: Color, v: number) => (color.alpha = v / 100),
  alphaValue: (color: Color, v: number) => (color.alpha = v / 100),
};

export const getters: Object &
  Record<string, (color: Color) => string | number> = {
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

  alpha: (color: Color) => Math.round(color.alpha * 100),
  alphaValue: (color: Color) => Math.round(color.alpha * 100),
};

export const getOnInput = (
  color: Color,
  setColor: React.Dispatch<React.SetStateAction<Color>>
) => (event: FormEvent<HTMLFormElement>) => {
  const { target, currentTarget } = event;

  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  const setter = setters[target.id];
  const value =
    target.id === 'hex' ? target.value : Number.parseInt(target.value);

  try {
    setter(color, value);
  } catch (e) {
    return;
  }

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

export const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

type GetLineraGradientArgs = {
  direction?: string;
  colorStops: (RGB | HSL | HSV | RGBA)[];
  colorInterface: RGBInterface | HSVInterface | HSLInterface | RGBAInterface;
};

type GetLineraGradient = (options: GetLineraGradientArgs) => string;

export const getLineraGradient: GetLineraGradient = ({
  direction = '90deg',
  colorStops,
  colorInterface,
}) => {
  const step = 1 / (colorStops.length - 1);
  return `linear-gradient(${[
    direction,
    ...colorStops.map(
      (colorStop, index) =>
        // @ts-ignore
        `${colorInterface.set(colorStop).toCss()} ${Math.round(
          index * step * 100
        )}%`
    ),
  ].join(', ')})`;
};

export const getStyleDeclarations = (color: Color) => {
  const c = new Color();
  return `
    #red:hover {
      background-image: ${getLineraGradient({
        colorStops: [
          [0, color.rgb.g, color.rgb.b],
          [255, color.rgb.g, color.rgb.b],
        ],
        colorInterface: c.rgb,
      })};
    }

    #green:hover {
      background-image: ${getLineraGradient({
        colorStops: [
          [color.rgb.r, 0, color.rgb.b],
          [color.rgb.r, 255, color.rgb.b],
        ],
        colorInterface: c.rgb,
      })};
    }

    #blue:hover {
      background-image: ${getLineraGradient({
        colorStops: [
          [color.rgb.r, color.rgb.g, 0],
          [color.rgb.r, color.rgb.g, 255],
        ],
        colorInterface: c.rgb,
      })};
    }

    #hue:hover {
      background-image: ${getLineraGradient({
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

    #saturation:hover {
      background-image: ${getLineraGradient({
        colorStops: [
          [color.hsv.h, 0, color.hsv.v],
          [color.hsv.h, 1, color.hsv.v],
        ],
        colorInterface: c.hsv,
      })};
    }

    #value:hover {
      background-image: ${getLineraGradient({
        colorStops: [
          [color.hsv.h, color.hsv.s, 0],
          [color.hsv.h, color.hsv.s, 1],
        ],
        colorInterface: c.hsv,
      })};
    }

    #hueL:hover {
      background-image: ${getLineraGradient({
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

    #saturationL:hover {
      background-image: ${getLineraGradient({
        colorStops: [
          [color.hsl.h, 0, color.hsl.l],
          [color.hsl.h, 1, color.hsl.l],
        ],
        colorInterface: c.hsl,
      })};
    }

    #lightness:hover {
      background-image: ${getLineraGradient({
        colorStops: [
          [color.hsl.h, color.hsl.s, 0],
          [color.hsl.h, color.hsl.s, 0.5],
          [color.hsl.h, color.hsl.s, 1],
        ],
        colorInterface: c.hsl,
      })};
    }

    #alpha:hover {
      background-image: ${getLineraGradient({
        colorStops: [
          [color.rgba.r, color.rgba.g, color.rgba.b, 0],
          [color.rgba.r, color.rgba.g, color.rgba.b, 1],
        ],
        colorInterface: c.rgba,
      })}, url(${bg2});
    }
  `;
};
