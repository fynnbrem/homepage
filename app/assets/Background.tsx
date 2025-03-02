import * as React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import { useEventListener } from "usehooks-ts";

/**Calculates the factor required to scale the `width` to  the `targetWidth`.
 * This returns `1` if `width >= targetWidth`*/
function getScale(width: number, targetWidth: number): number {
    if (targetWidth > width) {
        return targetWidth / width
    } else {
        return 1
    }
}

/**The background.
 * It has a default size of 1920x1080 pixels.
 * If the screen has a higher resolution, it will be scaled up to fit.
 *
 * This component must be loaded dynamically as it requires `window` to scale accordingly.
 * To smoothen this out, it uses a fade-in animation.*/
export default function Background({ color }: { color: string }) {
    const baseWidth = 1920
    const [scale, setScale] = useState(getScale(baseWidth, window.innerWidth))

    function updateScale() {
        setScale(getScale(baseWidth, window.innerWidth))
    }

    useEventListener("resize", updateScale)

    return (
        <Box
            className={"svg-wrapper"}
            sx={{
                position: "fixed",
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                overflow: "hidden",
            }}
        >
            <BackgroundGraphic color={color} />
        </Box>
    )
}

function BackgroundGraphic({ color }: { color: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={"100%"}
            height={"100%"}
            color={color}
            pointerEvents={"none"}
        >
            <defs>
                <symbol
                    id="a"
                    viewBox="0 0 64 64"
                    width={64}
                    height={64}
                >
                    <path
                        d="M3.169 28.646c-2.647.426-3.272 3.954-2.1 5.988.634 1.136 1.278 2.268 1.914 3.404-1.271-2.033-.854-5.471 1.722-6.22 1.906.203 3.32 1.935 5.02 2.78 7.545 4.762 15.448 9.987 24.603 10.663 8.894.609 17.465-2.358 25.909-4.715.841-.798 3.41.883 2.894.36-.684-1.055-.837-2.686-1.977-3.225-2.155-1.019-4.781.496-7.084.98-8.61 2.468-17.821 4.95-26.74 2.592-8.502-2.327-15.783-7.526-23.114-12.223-.303-.22-.656-.42-1.047-.384Zm-.018 9.691c.052.131.25.366 0 0zM15.11 7.043c-4.613-.193-8.167 5.106-6.248 9.296.614 1.607 1.895 2.786 3.364 3.585l2.126 1.28c-4.108-2.695-3.5-9.601 1.032-11.53 1.783-1.137 4.925-.627 6.214.182-1.07-.654-2.141-1.31-3.21-1.962a6.755 6.755 0 0 0-3.278-.851Zm6.825 3.018c.158.1.034.02 0 0zM15.49 21.89c.011.02.012-.007 0 0z"
                        style={{
                            fill: "currentColor",
                            fillOpacity: 1,
                            stroke: "currentColor",
                            strokeWidth: 0.999829,
                            strokeLinecap: "round",
                            strokeDasharray: "none",
                        }}
                    />
                    <circle
                        cx={18.314}
                        cy={15.757}
                        r={6.752}
                        style={{
                            fill: "none",
                            fillOpacity: 1,
                            stroke: "currentColor",
                            strokeWidth: 0.999829,
                            strokeLinecap: "round",
                            strokeDasharray: "none",
                        }}
                    />
                    <path
                        d="M47.592 13.18c-4.624-.201-8.148 5.119-6.248 9.296.615 1.609 1.898 2.788 3.369 3.587l2.12 1.276c-4.107-2.696-3.498-9.6 1.034-11.528 1.818-1.118 4.871-.661 6.216.183-1.07-.654-2.143-1.313-3.213-1.963a6.755 6.755 0 0 0-3.278-.851zm6.818 3.014c.175.11.037.021 0 0zm-6.437 11.831c.01.02.011-.006 0 0z"
                        style={{
                            fill: "currentColor",
                            fillOpacity: 1,
                            stroke: "currentColor",
                            strokeWidth: 0.999829,
                            strokeLinecap: "round",
                            strokeDasharray: "none",
                        }}
                    />
                    <circle
                        cx={50.796}
                        cy={21.894}
                        r={6.752}
                        style={{
                            fill: "none",
                            fillOpacity: 1,
                            stroke: "currentColor",
                            strokeWidth: 0.999829,
                            strokeLinecap: "round",
                            strokeDasharray: "none",
                        }}
                    />
                    <path
                        d="M5.745 32.001c22.208 14.637 27.866 16.684 53.283 8.847 5.77-1.78 6.593 2.327-1.327 7.992-18.639 13.33-40.731 4.286-53.283-8.847-4.664-4.88-.552-9.23 1.327-7.992Z"
                        style={{
                            fill: "none",
                            fillOpacity: 1,
                            stroke: "currentColor",
                            strokeWidth: 0.999829,
                            strokeLinecap: "round",
                            strokeDasharray: "none",
                        }}
                    />
                </symbol>
            </defs>
            <rect
                width="100%"
                height="100%"
                fill="#2a2a2a"
            />
            <use
                xlinkHref="#a"
                transform="rotate(27.32 242.131 2230.908) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-77.35 980.787 6.55) scale(1.37)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-172.57 598.278 74.337) scale(1.74)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-115.8 1225.179 -203.39) scale(1.91)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-6.05 9748.73 -2211.016) scale(1.7)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(52.36 -218.623 1702.538) scale(1.28)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-43.96 639.8 -1539.708) scale(1.93)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-109.91 364.478 350.934) scale(.84)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-131.36 481.246 -120.44) scale(1.9)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(92.93 118.969 520.184) scale(1.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-122.96 1090.931 11.152) scale(1.95)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-4.52 1110.933 -12681.401) scale(1.3)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(159.57 -21.978 291.056) scale(1.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(47.21 .807 2186.988) scale(.81)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-133.13 683.945 -89.486) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(147.89 701.047 711.622) scale(1.57)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(17.94 -1353.699 2584.555) scale(.92)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-118.06 297.545 -122.577) scale(1.81)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-15.22 2237.27 -2713.15) scale(1.82)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(118.11 647.557 788.74) scale(.63)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-147.12 615.778 331.738) scale(1.12)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-22.13 1823.806 -4351.996) scale(1.26)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(145.34 604.761 525.76) scale(1.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(7.07 -8181.953 4890.972) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(57.69 710.065 1894.645) scale(1.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(17.37 -2158.407 424.153) scale(.66)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-97.74 915.214 141.355) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-155.19 828 401.256) scale(1.3)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-21.76 1678.566 -3204.437) scale(1.17)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(45 337.097 1907.345) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-6.92 2941.23 -3942.174) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(65.26 174.28 794.248) scale(1.39)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(72.43 198.57 632.842) scale(.65)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-118.68 670.787 -75.503) scale(.57)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(178.52 583.639 199.617) scale(.88)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(7.97 -6913.915 7176.044) scale(.63)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-173.06 407.887 21.301) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(147.23 -48.249 470.278) scale(.9)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(78.41 81.237 1264.773) scale(1.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-125.71 235.103 277.225) scale(1.97)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-45.44 838.612 267.248) scale(1.92)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-76.54 794.945 -5.17) scale(1.33)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-121.43 568.473 -309.329) scale(.75)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(95.36 364.59 611.282) scale(1.22)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(101.43 58.43 226.854) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-169.25 721.86 291.955) scale(.77)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(124.48 625.01 413.758) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(20.07 406.465 1174.723) scale(1.38)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(59.9 613.02 1493.434) scale(.97)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(19.17 -570.514 446.277) scale(.68)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-23.77 1105.5 -1269.952) scale(1.68)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(133.94 546.612 494.426) scale(1.91)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(64.56 544.38 1554.168) scale(1.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(8.18 1695.18 10890.977) scale(1.94)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(51.77 -540.758 1095.754) scale(.85)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-119.25 872.209 -280.265) scale(.78)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-142.58 589.63 471.881) scale(1.84)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(30.37 -651.504 2388.578) scale(.61)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-153.67 869.33 173.301) scale(1.09)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-68.12 1402.575 -868.592) scale(1.64)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(119.16 103.908 563.501) scale(1.65)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(11.35 -3730.678 1519.026) scale(1.13)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(138.77 776.894 832.499) scale(1.64)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(49.74 558.543 1910.345) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-48.22 915.47 -457.52) scale(.72)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-3.44 2897.179 -1388.777) scale(.69)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-97.63 442.497 -375.478) scale(1.14)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(176.74 490.075 502.71) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(159.65 607.909 510.569) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(93.35 1.278 52.074) scale(1.86)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(130.53 -207.365 532.774) scale(1.72)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(74.23 270.057 901.563) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-92.53 1048.739 81.268) scale(1.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(171.65 107.769 551.728) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-48.15 1137.98 291.15) scale(1.59)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(53.19 237.742 1717.412) scale(.72)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-59.41 833.122 -558.456) scale(.57)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(65.25 48.744 1517.754) scale(.74)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(39.77 -424.99 3149.407) scale(1.09)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-135.09 302.108 535.903) scale(.86)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-89.38 411.64 71.898) scale(1.76)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-93.39 1161.182 -263.025) scale(.61)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-28.71 342.832 -306.834) scale(1.27)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(37.24 -223.797 997.431) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(39.77 131.095 2151.037) scale(1.12)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(54.87 365.742 1689.886) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-140.37 1001.806 -255.977) scale(.88)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-34.84 1374.143 -278.457) scale(1.39)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-50.33 -64.411 97.489) scale(1.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-92.51 932.864 -652.982) scale(1.66)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(165.38 453.857 471.77) scale(1.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-134.66 925.11 190.172)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-150.02 117.767 298.38) scale(.72)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-84.76 971.657 30.423) scale(.56)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(153.61 511.652 567.35) scale(2)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(127.69 591.274 920.338) scale(1.14)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-76.99 1565.98 -619.84) scale(.62)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-56.98 374.998 160.514) scale(1.69)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(169.73 219.85 101.773) scale(1.56)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(54.93 82.514 716.192) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(113.33 244.228 513.091) scale(.69)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(151.28 272.082 131.049) scale(1.08)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-135.24 350.358 325.676) scale(1.13)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(46.15 252.205 1109.468) scale(1.95)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(119.98 468.394 472.688) scale(1.09)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-29.77 1999.17 119.297) scale(.69)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(95.48 220.233 114.785) scale(1.96)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(139.59 173.015 205.122) scale(.59)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-36.58 1840.882 -1632.163) scale(1.62)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(15.37 -3641.628 2112.813) scale(.67)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-104.59 786.244 -439.79) scale(1.93)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-88.85 1231.307 -668.071) scale(1.98)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(20.11 -137.445 2226.97) scale(.91)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-59.06 890.437 -1453.129) scale(1.55)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-61.05 1796.177 -832.926) scale(1.72)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(144.95 707.384 358.722) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-144.58 1102.223 129.075) scale(1.05)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(98.56 -279.525 439.523) scale(1.29)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(3.42 -3850.405 3973.602) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(53.95 -384.105 653.993) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(127.83 328.947 828.792) scale(.8)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-3.38 9451.982 -15301.002) scale(.9)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-17.17 2959.292 -3787.991) scale(1.04)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(132.6 238.863 293.493) scale(.55)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-103.98 864.308 -127.36) scale(.53)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(113.55 636.485 539.244) scale(1.06)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(175.95 705.65 128.68) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(44.8 -313.003 524.065) scale(.77)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-62.96 789.47 289.078) scale(.8)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-47.24 1304.214 -367.776) scale(1.76)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(73.33 -456.374 369.437) scale(.88)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-28.18 464.67 330.812) scale(1.56)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-27.14 980.836 -728.254) scale(.56)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-95.95 889.816 -324.523) scale(.61)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-84.47 883.172 -320.897) scale(.63)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-17.38 3182.14 -2963.56) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(178.96 97.297 65.142) scale(1.25)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-33.66 1150.1 -446.265) scale(.66)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(63.45 -634.175 389.513) scale(1.37)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(43.15 -200.135 1710.373) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(2.37 499.984 24012.532) scale(.74)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(9.33 -894.737 7573.289) scale(.73)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-6.4 9119.407 -9505.05) scale(.79)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(156.95 871.933 350.07) scale(1.1)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-113.11 458.582 144.757) scale(.64)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(157.84 526.75 359.565) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-95.32 778.236 3.163) scale(1.21)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(64.76 -319.453 300.899) scale(.92)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-50.05 540.06 -285.508) scale(.63)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-72.73 815.522 212.233) scale(1.1)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-99.77 373.676 -306.494) scale(1.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(50.5 75.597 1816.577) scale(1.18)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-24.88 1505.91 -303.564) scale(1.14)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(29.17 -1046.631 3342.57) scale(1.72)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-39.06 69.298 -62.833) scale(.65)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(91.05 230.84 819.957) scale(.96)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-68.21 391.053 -385.752) scale(1.93)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-67.9 1151.214 -750.456) scale(.84)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(35.03 -1136.31 1648.842) scale(1.13)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-30.66 871.901 -3357.306) scale(1.93)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-121.82 289.148 -24.867) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(179.51 156.279 155.096) scale(.76)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(59.19 476.105 1288.296) scale(.9)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-178.01 270.121 268.185) scale(.9)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(131.21 121.822 665.697) scale(.98)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(132.27 .65 126.841) scale(.91)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(10.7 -2293.31 1533.83) scale(1.32)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(95.94 614.439 973.553) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(126.26 234.826 671.177) scale(.68)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(138.51 927.587 467.347) scale(1.92)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-71.85 1264.346 -941.023) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(84.41 252.98 1025.42) scale(1.31)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-54.48 762.804 -1214.717) scale(.63)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(94.52 -397.523 466.828) scale(1.05)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-114.45 1026.982 -73.86) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-19.04 1694.048 -1903.078) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(108.17 797.428 599.63) scale(1.29)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(145.96 515.634 292.591) scale(1.7)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-175.86 336.696 483.543) scale(.98)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-13.95 2927.373 -2624.773) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-84.3 791.145 36.753) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-138.06 522.69 169.308) scale(.64)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-152.73 314.28 460.053) scale(.93)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-58.07 1159.83 -1170.787) scale(.84)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(93 162.4 802.888) scale(.84)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(88.28 611.11 696.014) scale(1.01)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(71.47 525.176 1579.715) scale(.98)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-120.18 504.48 149.97) scale(.7)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(163.98 229.786 364.031) scale(.57)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-138.06 68.072 49.116) scale(.78)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(131.33 292.215 733.833) scale(.65)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-140.01 210.835 52.48) scale(.59)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(42.48 467.478 2271.095) scale(1.72)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-176.73 633.936 285.593) scale(.96)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-139.64 670.202 195.958) scale(1.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(36.47 153.062 1929.993) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-55.3 1823.818 -1339.7) scale(1.34)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(89.95 609.94 1184.31) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(157.66 850.71 592.912) scale(.61)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(150.62 233.943 360.63) scale(.61)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-38.07 1238.04 -1953.82) scale(.75)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(145.63 334.931 642.306) scale(1.07)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(137.03 3.704 170.33) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-148.96 979.327 -84.484) scale(1.17)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(46.46 246.439 1024.028) scale(.59)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(146.16 38.602 525.314) scale(.55)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-23.35 3387.642 -2913.469) scale(1.73)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(145.08 730.89 440.358) scale(.76)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-88.8 232.249 54.637) scale(.65)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(171.1 887.595 305.083) scale(.76)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-68.05 1269.26 -259.312) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-163.43 907.885 134.94) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-134.43 336.21 280.681) scale(.53)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-77.08 515.92 -649.32) scale(.78)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-123.29 409.374 -61.985) scale(1.26)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(157.43 739.587 160.008) scale(.61)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(2.57 702.855 36719.552) scale(.56)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(165.49 220.742 485.624) scale(1.27)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(145.75 707.582 503.726) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-104.16 736.885 -131.388) scale(.8)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-58.04 1295.858 -58.55) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(33.86 148.725 1012.91) scale(.9)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-149.63 290.88 34.849) scale(.77)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(64.74 -517.425 1040.507) scale(.81)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(101.84 258.893 699.86) scale(.66)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-.42 81748.51 -117029.936) scale(.67)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-74.46 1516.18 -607.443) scale(.61)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(105.23 -124.76 187.568) scale(1.9)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-158.25 702.214 374.327) scale(.76)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-88.76 559.565 442.318) scale(.77)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(141.57 537.215 698.478) scale(1.1)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(114.74 629.004 850.455) scale(.8)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(52.02 -848.012 803.662) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-114.42 410.462 302.887) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(3.23 -13922.986 7505.983) scale(.75)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(51.98 -709.476 947.762) scale(1.63)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-1.6 14776.379 -51337.949) scale(.62)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-178.71 254.674 232.575) scale(.58)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-107.44 96.018 -31.996) scale(1.05)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(108.2 195.156 821.079) scale(.61)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(131.87 842.64 655.966) scale(1.01)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-130.03 898.348 -320.733) scale(.72)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-22.73 1793.806 -4042.29) scale(.74)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-134.11 862.862 -302.72) scale(.55)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(123.79 773.787 399.54) scale(.66)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-69.29 1323.085 -866.598) scale(.91)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(89.33 -236.083 357.646) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(55.01 -344.314 1754.425) scale(.8)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(159.15 479.222 331.416) scale(.67)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-70.72 1007.882 -1254.408) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-41.1 802.288 429.622) scale(1.34)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-132.83 1091.277 111.784) scale(.7)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(36.08 -75.986 775.57) scale(.68)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-.8 46796.053 -48224.484) scale(.74)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-152.99 835.667 184.109) scale(.78)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(89.16 547.537 758.506) scale(.58)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-89.2 938.556 122.703) scale(.92)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(35.15 -51.212 3311.188) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-6.07 10898.076 -14122.214) scale(1.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(49.31 -205.4 1724.739) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(53.78 476.932 1327.213) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-130.06 309.8 327.904) scale(1.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(99.74 213.977 153.64) scale(.65)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(112.71 94.581 251.063) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-45.21 385.045 -860.86) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(149.67 679.807 582.868) scale(.71)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(88.37 382.724 1242.1) scale(.57)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-81.77 1091.232 93) scale(1.35)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(1.61 -28940.432 66401.443) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-125.93 798.118 185.716) scale(.57)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-43.35 874.28 -149.399) scale(.64)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-77.49 765.804 -958.513) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(4.67 -3825.256 10822.812) scale(.79)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-77.35 1025.327 -924.787) scale(.58)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(134.03 340.407 648.889) scale(.9)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-64.36 1217.38 -933.418) scale(.61)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(51.13 -978.486 594.645) scale(1.11)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-155.61 1033.108 197.482) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-136.44 1072.652 -12.794) scale(.76)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-162.68 964.801 205.544) scale(.57)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(.07 -472542.06 1244632.364) scale(.57)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-7.8 4676.136 -12993.47) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-172.4 826.448 359.966) scale(.82)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-6.63 2483.666 -1113.314) scale(.64)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-45.39 548.21 -1222.196) scale(.61)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-88.99 976.465 -69.875) scale(.81)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(64.41 842.415 1476.61) scale(.66)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(114.56 625.17 563.732) scale(.59)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(136.34 594.146 421.943) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-23.2 599.488 -2634.698) scale(1.07)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(73.05 130.606 500.964) scale(1.18)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-147.71 181.316 549.42) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-45.72 985.973 -145.09) scale(.88)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(18.52 236.116 4797.997) scale(.53)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(124.3 241.934 460.398) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-100.32 29.174 18.48) scale(.6)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-115.02 626.734 151.817) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(128.38 581.409 388.535) scale(.6)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(87.33 437.26 892.996) scale(.79)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-74.65 1298.149 -272.413) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(1.29 -12180.133 59997.304) scale(1.14)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(65.12 109.215 72.04) scale(.91)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-165.94 45.037 192.283) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(10 -1520.108 1947.05) scale(1.03)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-48.6 726.182 -628.292) scale(.59)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-2.7 12366.073 -21550.193) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(171.89 922.01 450.222) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-32.63 1352.786 -1582.863) scale(.59)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(86.7 -48.685 284.04) scale(1.02)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-68.92 923.273 -216.427) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(20.19 -1575.083 1690.382) scale(.7)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(159.66 91.913 127.91) scale(1.14)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-75.3 1078.76 -595.139) scale(.53)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-113.44 944.05 -569.785) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(174.58 600.487 298.017) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-47.28 1637.708 -1288.139) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(70.58 738.579 1193.455) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(78.47 446.044 944.994) scale(.77)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-9.61 6519.666 -332.703) scale(1.73)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-58.25 1328.117 -1228.873) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(91.54 432.527 1456.214) scale(1.75)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-167.77 149.93 525.708) scale(.84)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-160.31 78.791 319.936) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(140.94 259.809 496.327) scale(.55)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(98.64 -78.168 408.765) scale(.58)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(76.39 -483.452 562.933) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(105.43 142.254 563.584) scale(.78)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(118.5 115.644 466.466) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(28.67 -932.335 3773.681) scale(.56)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-34.82 1006.007 -1586.84) scale(.87)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(19.94 -321.114 397.216) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(115.04 61.176 408.145) scale(.77)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(55.18 503.051 1579.317) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-95.13 444.752 1.265) scale(1.21)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(85.25 6.567 1128.905) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(134.51 488.52 684.193) scale(.99)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(41.58 208.317 2689.787) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-25.93 588.537 -2529.924) scale(.62)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-132.96 485.044 352.244) scale(.55)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-76.11 860.093 -757.44) scale(.68)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(128.15 31.405 701.933) scale(1.17)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(164.75 146.34 462.755) scale(.64)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(30.59 -947.094 1840.372) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-159.52 807.795 130.851) scale(.72)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(48.98 16.383 404.191) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-89.57 769.59 -697.65) scale(.82)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-70.6 1231.572 -859.37) scale(.73)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(96.75 525.89 1099.433) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(163.93 259.27 381.486) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-14.4 4896.648 -5207.026) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(31.3 66.334 859.675) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(114.15 214.285 451.688) scale(.88)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-82.72 272.942 -209.235) scale(.8)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(66.81 182.107 553.872) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-4.01 13935.83 192.944) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(123.85 711.12 991.335) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-3.8 2002.431 -6978.28) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-55.25 992.438 145.474) scale(.72)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-89.53 966.39 -422.086) scale(.56)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-170.77 781.865 391.786) scale(.64)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-4.59 2799.942 -5996.716) scale(.63)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-133.21 746.094 259.777) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-43.96 450.794 -306.493) scale(.69)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-3.08 534.662 -3794.433) scale(1.02)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(55.79 -468.14 1144.115) scale(.66)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-19.05 1010.31 -4723.139) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(12.19 -2732.866 1374.656) scale(.81)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-175.01 332.822 510.946) scale(.89)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(109.51 -58.186 377.447) scale(.56)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(20.88 -1853.072 864.614) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-19.1 2521.365 72.555) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-134.79 711.29 142.017) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(5.27 -7580.324 19494.55) scale(.88)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-3.68 3940.762 -23092.238) scale(.73)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-103.51 260.673 152.76) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(5.61 -10370.009 12768.474) scale(1.17)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-53.83 717.413 -390.806) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-15.29 1763.879 -6982.774) scale(1.39)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(24.44 56.902 3440.903) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(141.1 452.393 258.478) scale(.6)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(4.41 -4045.843 418.685) scale(.59)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-30.04 2439.617 -1951.702) scale(.87)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(139.41 98.226 252.974) scale(.58)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-126.16 746.379 25.06) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-41.41 808.916 -165.447) scale(.69)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-56.3 1191.064 -847.454) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(64.57 453.4 1051.336) scale(.67)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(143.78 364.212 367.625) scale(.88)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(96.82 -46.344 786.613) scale(.84)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(33 -331.257 1924.068) scale(.89)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(134.87 123.96 553.172) scale(.56)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(112.53 234.174 362.23) scale(.67)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(49.6 -489.766 1973.46) scale(.53)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-78.21 490.3 -428.874) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(33.25 194.963 1980.637) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-52.51 956.153 -887.083) scale(.53)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(2.14 -16529.91 24012.726) scale(.58)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-147.56 89.614 218.289) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(145.64 311.578 534.858) scale(.63)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-132.74 907.072 66.343) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-175.68 694.534 492.447) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-131.38 807.617 50.206) scale(.59)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-92.41 555.185 -374.866) scale(1.05)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(95.03 408.789 1262.499) scale(.61)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-56.92 366.415 -244.042) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(87.16 -112.906 171.375) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-14.89 2480.295 -7040.42) scale(.65)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-1.34 14890.862 -50465.023) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(164.27 320.403 167.473) scale(.61)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(51.5 573.381 1261.087) scale(.89)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(87.25 308.932 1257.004) scale(.57)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-136.4 846.284 -54.982) scale(.75)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-33.5 1270.894 -1864.75) scale(.57)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-127.43 476.449 -35.145) scale(.69)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-40.74 1133.41 -1555.642) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-20.54 2083.886 -2638.233) scale(.56)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(82.45 431.337 1270.402) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(107.01 -94.257 546.928) scale(.73)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-15.66 3264.789 -560.979) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(158.91 -8.67 238.632) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-109.17 968.348 -203.503) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-23.65 2016.234 -3656.864) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-140.23 689.98 123.091) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-84.14 1110.488 -596.772) scale(.57)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(129.7 600.062 370.267) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(97.14 339.063 282.824) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-144.75 356.603 114.683) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(156.32 -66.328 399.75) scale(.55)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(21.57 -1864.073 582.074) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(69.07 -271.855 1250.378) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-179.23 204.63 154.285) scale(.81)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(30.25 -558.371 2999.162) scale(.53)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-89.69 617.307 62.158) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-28.99 617.364 -939.36) scale(.64)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(128 651.774 973.327) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(71.6 132.45 1688.167) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(85.78 739.103 751.974) scale(.63)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-170.87 810.863 191.763) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(161.28 774.43 522.679) scale(.64)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-178 854.283 134.926) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-128.37 271.435 481.294) scale(.92)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-58.55 962.314 -995.808) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-30.02 2254.518 -316.005) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(114.83 26.794 644.637) scale(.58)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-50.59 503.147 254.605) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(103.88 815.033 654.974) scale(.53)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(87.24 -68.87 568.432) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-162.85 23.9 100.005) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(84.97 362.209 1474.997) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-126.78 494.734 -214.007) scale(.59)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-34.1 2305.407 -1771.14) scale(.75)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(65.69 264.768 1488.82) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-146.17 638.857 163) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(65.83 720.918 1461.316) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-143.93 528.32 -13.794) scale(.66)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(163.44 549.633 348.133) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-53.44 884.128 -280.362) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(143.99 209.59 569.462) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(38.66 -533.654 1413.744) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(15.43 -3082.739 4750.224) scale(.92)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(151.73 86.422 182.385) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-101.89 943.412 -612.962) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(3.04 -7804.085 4152.192) scale(.66)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(28.33 -372.8 3397.08) scale(.66)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-176.24 136.704 104.494) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-168.46 909.284 -12.709) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(25.38 -1924.05 582.338) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(178.25 324.528 293.439) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(10.44 -216.327 4212.84) scale(.79)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-5.73 242.306 -12151.265) scale(.66)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-53.85 811.478 -104.719) scale(.65)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(4.07 1134.319 25156.491) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-85.95 1435.721 -422.955) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(70.85 -186.597 748.102) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(9.04 -130.174 9723.338) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(130.27 -127.558 541.422) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-156.67 194.683 1.433) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(127.34 350.856 487.518) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(154 575.944 278.893) scale(.53)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(129.59 748.652 747.081) scale(.74)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-174.47 182.205 274.473) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(125.34 629.222 674.648) scale(.69)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-94.5 828.355 24.938) scale(.61)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-10.4 2563.689 -3745.603) scale(.69)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(166.3 386.496 83.327) scale(.53)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(76.97 593.53 1165.526) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(155.15 279.918 190.11) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(4.56 -3673.84 3262.48) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(59.01 450.037 1200.837) scale(.59)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(77.21 -60.212 109.273) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(117.4 136.383 137.298) scale(.8)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-11.55 2382.414 -4622.616) scale(.6)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-61.34 298.43 -46.192) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(12.75 -317.89 3404.65) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-153.9 953.976 61.824) scale(.81)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(70.4 337.584 1715.63) scale(.62)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(83.61 206.188 1164.043) scale(.66)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-53.6 809.444 -1253.91) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-59.15 452.068 -463.045) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-138.05 892.393 -58.61) scale(.55)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-171.3 395.277 25.279) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(57.06 465.634 764.883) scale(.67)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-162.97 962.91 -93.185) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-129.51 999.894 -86.187) scale(.55)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(72.51 152.428 243.297) scale(.71)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-108.66 485.905 -335.995) scale(1.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(51.56 -214.927 908.178) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(112.06 655.029 656.822) scale(.66)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-51.09 923.564 -936.841) scale(.55)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(51.52 22.982 1427.79) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-23.29 973.551 -4353.603) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(61.59 -341.36 974.298) scale(.53)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-48.82 1166.875 -1815.315) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-67 408.788 18.172) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(142.73 202.16 242.585) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(88.08 551.829 1334.245) scale(.76)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-157.54 702.071 300.816) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(159.73 520.297 555.94) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(33.29 -203.748 1814.373) scale(.68)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-146.15 1016.505 204.692) scale(.56)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(43.67 -736.714 1089.092) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-115.53 805.734 -115.786) scale(.99)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(25.98 562.666 3372.692) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(177.11 38.364 322.675) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(105.89 -124.405 726.958) scale(.7)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-84.3 961.154 -198.612) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(98.93 476.655 453.674) scale(.58)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-102.5 849.596 -554.75) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(83.37 26.583 170.153) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-86.34 1165.443 -624.472) scale(.59)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(26.33 -1136.507 736.497) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-176.57 826.973 43.928) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-154.76 722.579 -122.388) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-44.29 428.093 -970.557) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-111.74 954.135 -201.901) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-168.14 459.902 129.303) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-22.31 2019.8 -1734.51) scale(.64)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(27.07 403.153 1436.887) scale(.68)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-156.05 1025.699 114.032) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-123.89 726.839 143.207) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-154.57 71.896 18.057) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(113.87 106.177 819.1) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(35.16 716.198 2236.586) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-16.14 2173.334 -1506.203) scale(.61)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-68.29 921.279 -257.066) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-148.85 287.38 427.801) scale(.73)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-106.18 1088.32 -269.004) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-24.25 1110.167 13.077) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(92.28 -103.272 513.102) scale(.57)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-153.53 819.75 -70.705) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-160.61 853.623 -135.404) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(128.84 169.974 741.692) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-97.73 501.563 -292.94) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-169.35 790.467 355.432) scale(.68)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-1.29 803.361 -67241.133) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(69.66 280.109 902.39) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-98.16 917.774 -188.282) scale(.63)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(6.37 -7719.775 9602.075) scale(.6)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-92.98 912.705 -298.673) scale(.62)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(14.63 -1022.64 3810.462) scale(.57)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(29.7 248.945 2851.006) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-175.54 235.27 134.934) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(116.88 -24.957 666.69) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(80.82 -218.08 698.369) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-27.27 1547.088 -320.672) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(26.27 -1355.585 2210.106) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(89.85 311.66 1378.895) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-133.95 910.084 -119.121) scale(.55)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(20.01 -1547.863 2127.246) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(128.45 963.027 517.4) scale(.67)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(125.74 610.32 763.53) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(45.55 -725.572 387.803) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(18.45 -1557.866 2048.362) scale(.63)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-160.02 174.488 160.942) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-104.94 1052.148 -69.842) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-164.4 539.768 269.188) scale(.6)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-41.32 2179.07 -1517.364) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(56.16 -141.481 433.67) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(52.6 -381.364 1114.025) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(104.38 -20.106 471.829) scale(.61)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-21.28 1546.197 -1837.744) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(112.57 51.322 627.407) scale(.76)"
            />
            <use
                xlinkHref="#a"
                transform="matrix(.44 .0003 -.0003 .44 635.83 909.01)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(142.94 819.365 586.724) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-79.43 756.802 391.044) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(20.42 -1372.837 1423.45) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(46.7 -90.497 2469.198) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(24.85 65.17 53.905) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(61.82 -53.643 507.002) scale(.55)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-119.13 418.345 244.593) scale(.55)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(133.84 240.976 700.4) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(155.06 166.46 90.024) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-40.58 2289.87 -2014.197) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-113.43 576.57 29.866) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(44.74 -84.028 1287.9) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-125.52 206.009 38.14) scale(.56)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(149.09 319.482 595.002) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-147.26 222.402 -30.766) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(176.21 487.6 488.712) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(162.45 627.476 532.464) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-29.46 2290.275 -3209.076) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-42.37 1341.72 -420.553) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(42.68 842.8 2398.301) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(160.17 459.708 489.402) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(113.49 169.187 302.002) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(88.73 634.754 650.145) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-153.44 544.194 202.717) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-143.12 451.328 132.95) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(52.99 367.044 1617.764) scale(.65)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(103.27 237.527 926.134) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(118.4 -42.139 268.406) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(146.05 685.254 266.25) scale(.61)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(121.76 -6.036 595.809) scale(.58)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(140.22 146.148 345.695) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(81.11 -309.4 601.462) scale(.55)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-71.18 1393.15 -553.472) scale(.72)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(25.62 -527.512 2306.358) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-164.31 326.371 325.862) scale(.58)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(55.84 29.582 571.068) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-174.63 50.976 87.358) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(117.76 320.544 513.585) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-117.15 1045.023 -94.065) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(129.69 666.818 599.639) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-37.9 2009.24 -1080.958) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-69.14 1056.202 -551.819) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(172.83 102.79 451.653) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(115.61 -117.397 454.31) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-174.67 419.296 35.624) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(104.75 488.251 811.48) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-164.27 592.64 -26.01) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-106.88 1115.434 -464.906) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-143.16 824.932 -170.09) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-20.05 3034.715 -4160.288) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(165.74 214.771 244.718) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-126.04 1122.993 6.128) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-117.05 1031.036 -435.634) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-162.95 791.669 95.612) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-145.96 82.828 128.715) scale(.53)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-2.21 20759.934 -4464.76) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(94.17 -276.56 622.544) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(19.28 -1632.927 4247.793) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-29.16 2334.064 -2287.572) scale(.65)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-43.49 413.977 -936.824) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(83.38 552.592 1285.64) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-34.45 1386.28 -1866.748) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(157.88 153.158 300.167) scale(.56)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-92.78 666.43 -498.268) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(83.39 431.887 1576.215) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-70.39 952.82 -1174.197) scale(.55)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(163.54 65.308 217.008) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-.76 70262.427 -10847.088) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(125.61 904.575 535.264) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-174 422.651 313.346) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-84.78 1314.465 -722.736) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-68.9 1787.09 -817.676) scale(1.3)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-166.98 956.587 259.67) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-118.58 373.651 16.565) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-179.71 595.598 296.325) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(168.09 519.179 391.078) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-100.45 549.541 452.77) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-40.39 1512.835 454.231) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-92.63 1042.449 -305.651) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(73.05 184.655 1692.218) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(147.03 833.888 312.677) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(74.16 -61.751 634.308) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(36.31 -1005.883 2351.041) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(118.56 782.041 708.24) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(61.52 -589.104 422.04) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-47.98 932.236 -1279.93) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(69.9 312.944 1236.365) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(130.27 54.919 609.68) scale(.53)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(1.62 -12632.476 66347.231) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-71.68 867.711 -191.337) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-40.39 771.041 -598.067) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-130.59 205.424 -75.271) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-37.78 1283.448 -1830.125) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(133.42 451.16 376.29) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(61.32 33.679 1133.77) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(152.72 767.321 521.7) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-27.67 864.39 -1169.585) scale(.77)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-14.03 1593.036 -4515.806) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(178.77 359.3 290.386) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(120.98 143.85 387.796) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-6.33 2209.457 -2670.296) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(95.2 261.336 590.744) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(179.08 531.709 197.207) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(94.46 -157.21 754.322) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-93.14 496.328 370.551) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(126.26 36.808 690.323) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(115.74 277.081 615.014) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-115.59 470.88 -97.21) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(126.68 654.477 972.974) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-132.58 846.058 -325.016) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(169.79 813.49 154.73) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(96.69 607.823 1009.873) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(78.68 93.935 277.03) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-81.02 974.548 125.175) scale(.64)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-135.77 310.613 83.734) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-150.64 1026.9 56.263) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(13.57 -387.735 6808.765) scale(.64)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(72.79 601.674 1166.465) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-19.37 2465.08 -3060.008) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(159.42 874.01 265.619) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-89.51 1060.71 -860.256) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(109.4 411.062 694.783) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-131.55 186.928 -58.352) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-54.57 688.113 -179.098) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-26.73 939.515 80.166) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-120.85 35.777 -6.964) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-51.99 1071.249 -43.11) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-62.17 706.788 303.412) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-89.18 1166.973 -214.71) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(156.02 123.375 267.499) scale(.53)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(37.82 -445.598 2673.453) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(75.66 249.39 332.911) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(37.03 454.207 1816.402) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(29.11 -1114.686 2248.284) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-176.3 965.503 422.768) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-160.3 540.928 345.809) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-144.74 790.96 -139.291) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(25.55 -199.838 4348.96) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-107.73 906.676 100.041) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(.14 -19641.557 765010.587) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-86.73 902.519 -740.73) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-113.16 1123.072 -15.658) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(57.21 -229.54 398.267) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(162.45 619.111 382.16) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(126.17 410.231 647.62) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-167.88 46.662 70.5) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-81.71 1084.766 -31.081) scale(.59)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(20.24 -1145.138 750.035) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-7.67 3791.407 -5435.82) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-175.75 308.013 33.92) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(39.02 452.06 2557.04) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-169.85 182.85 136.075) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(.12 -222519.642 638215.598) scale(.55)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-11.44 4181.254 -5272.5) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(148.56 -99.375 450.897) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-143.13 523.73 -58.447) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(88.83 -371.955 658.06) scale(.53)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-55.93 1018.554 -1006.152) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-17.23 2465.867 -3123.367) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(149.03 558.458 502.7) scale(.5)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-56.79 1401.902 -320.952) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-64.52 852.473 -122.653) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-165.45 39.1 37.869) scale(.55)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(29.17 -1323.71 3051.177) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-169.58 465.2 462.727) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(62.87 -257.326 1332.29) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(60.53 71.765 462.742) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-36.65 1234.542 -103.661) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-148.32 672.399 -11.727) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-41.91 716.483 -136.384) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-90.43 798.005 -405.424) scale(.57)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(85.5 547.575 1120.766) scale(.61)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-119.36 1044.159 133.647) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-150.55 653.435 388.43) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(100.43 203.006 771.754) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-36.35 1510.13 -207.936) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-75.67 708.639 147.024) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(144.22 552.628 227.492) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-166.47 369.327 88.317) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-153.76 474.238 -17.266) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(178.03 674.562 381.021) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-161.69 751.895 -5.02) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(53.28 499.917 1961.635) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-45.24 677.979 -1472.442) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(107.2 -114.74 525.653) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(115.71 710.096 944.568) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-67.77 567.718 323.628) scale(.54)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-176.85 352.855 317.863) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-49.8 840.379 -1564.48) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-109.26 911.187 14.097) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(170.09 196.557 271.632) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-88.67 652.117 -161.525) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-46.39 1261.128 493.967) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(23.17 -304.769 1972.698) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(164.26 800.163 507.539) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(133.04 634.192 565.05) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-40.89 896.138 -2430.966) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(91.44 284.764 1063.972) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(21.26 -1143.73 2532.724) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-29.29 2227.015 -2507.162) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(89.38 86.98 1028.14) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(93.12 141.28 773.56) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-113.11 886.453 -22.752) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(163.68 53.453 155.017) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-117.15 555 284.816) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-167.22 890.906 266.524) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(63.56 -189.789 1319.376) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(155.99 516.607 352.322) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-109.17 589.689 -93.973) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(154.08 814.162 652.474) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(162.51 208.021 453.7) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(94.03 227.605 1079.101) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(14.33 -3212.816 4275.633) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-68.92 161.251 128.832) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(142.83 520.614 532.171) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-48.9 1343.861 87.071) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(16.7 -975.586 5084.34) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-66.05 904.108 -913.92) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(20.56 773.199 4993.136) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-96.39 453.229 354.596) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(131.53 840.8 733.632) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-113.51 734.18 281.195) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-92.11 1291.954 -305.826) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-75.02 1320.617 -714.985) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(142.56 502.202 249.404) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-167.01 388.526 453.827) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(30.32 699.368 3066.22) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-82.88 778.53 191.859) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(63.17 164.046 1580.171) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(48.03 -426.286 1380.57) scale(.47)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-98.52 457.121 434.01) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-177.45 288.635 75.904) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(11.06 -3282.397 4348.063) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-155.18 799.592 360.997) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(128.91 692.577 974.81) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(87.79 304.485 452.589) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-18.65 1913.968 -4599.044) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-82.3 823.195 -141.417) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(6.45 -5405.036 8993.669) scale(.49)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-141.35 781.935 294.836) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-99.36 319.35 163.084) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(122.08 376.923 419.016) scale(.52)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(146.32 452.53 254.718) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-130.98 180.217 210.883) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-158.59 498.05 425.264) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-121.68 348.448 -33.376) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-112.44 123.434 184.503) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-46.86 661.93 203.156) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-25.77 964.471 225.087) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(109.59 549.361 844.238) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(163.13 207.298 560.253) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-169.39 370.885 507.494) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(26.49 506.231 2788.897) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(90.31 -66.418 784.67) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(61.71 -13.302 9.07) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-93.2 720.901 -211.885) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(120.52 386.03 544.187) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-20.89 507.858 -1469.666) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-44.58 639.64 -341.668) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-124.82 697.877 -232.948) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-169.18 930.355 229.991) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-44.85 1577.33 -1160.225) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-85.5 642.748 -42.71) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(174.52 866.621 224.399) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(140.93 341.861 128.426) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-43.24 869.816 -1224.76) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-24.71 2676.131 -364.07) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(159.12 555.448 110.719) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(169.66 467.423 302.839) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(145.58 318.237 698.96) scale(.57)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-110 1087.793 23.938) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(12.49 -1922.384 8171.141) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(171.63 760.318 442.977) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(166.99 527.186 541.753) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-129.06 978.676 -372.312) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-38.04 1492.41 -1776.802) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-26.59 2225.213 119.67) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(60.34 -658.959 601.288) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-71.72 684.13 -520.882) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(42.63 79.319 1641.506) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-174.79 626.174 370.04) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-63.48 984.576 -596.521) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-7.95 1206.43 -3106.162) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(163.11 326.274 403.153) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(25.97 -1362.391 4350.27) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(55.77 395.858 1403.516) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(99.07 215.752 682.92) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-138.18 383.6 88.139) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(161.87 -50.035 351.908) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(58.56 331.613 1671.223) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-15.96 4593.496 -5292.958) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(42.25 -534.996 2271.041) scale(.48)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-169.41 537.64 462.25) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-51.06 1380.892 -217.754) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-46.28 1521.832 -1227.958) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(.78 -29436.432 136719.94) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(151.13 102.352 78.389) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(20.96 -399.495 2402.437) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-6.54 2324.33 -6173.824) scale(.44)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(58.75 -632.073 522.858) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(152.16 -6.839 139.67) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-85.88 1371.07 -586.044) scale(.4)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(35.59 139.982 2353.979) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-119.87 1170.848 -4.106) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(127.84 -170.794 454.872) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(156.2 769.511 441.697) scale(.45)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-61.53 634.97 -994.63) scale(.46)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(104.38 190.277 602.107) scale(.51)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(-112.72 493.698 49.446) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(174.28 819.528 511.312) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(86.92 99.968 282.312) scale(.42)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(151.39 314.806 549.661) scale(.43)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(32.69 -1186.785 599.787) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(129.36 394.946 290.199) scale(.41)"
            />
            <use
                xlinkHref="#a"
                transform="rotate(156.5 890.759 546.706) scale(.43)"
            />
        </svg>
    )
}
