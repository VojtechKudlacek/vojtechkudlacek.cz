// tslint:disable: max-line-length
//? Core
import React, { FunctionComponent, useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { tween, easing } from 'popmotion';

interface Properties {
	sceneChanging: boolean;
}

const PowerOfJavaScript: FunctionComponent<Properties> = ({ sceneChanging }) => {
	const props = useSpring({
		opacity: sceneChanging ? 0 : 1,
		left: sceneChanging ? 30 : 0,
		from: { left: 0 },
		config: { duration: 600 }
	});
	const [progress, setProgress] = useState<number>(0);
	useEffect(() => {
		const animation = tween({
			from: 0,
			to: 1,
			duration: 2000,
			ease: easing.easeInOut
		}).start({ update: setProgress });
		return animation.stop;
	}, []);
	return (
		<div className="jspower">
			<animated.svg style={props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107 470">
				<g stroke="#666666" strokeWidth="0.5" fill="none" strokeMiterlimit="10">
					<path strokeDasharray={`${progress * 169}, 169`} d="M71.204,63.929h-16.2V47.946h50.976v22.32 c0,6.239-1.584,11.027-4.752,14.364c-3.168,3.335-7.416,5.004-12.744,5.004c-3.216,0-6.132-0.745-8.748-2.232 c-2.617-1.489-4.692-3.685-6.228-6.588c-1.537-2.904-2.304-6.42-2.304-10.548V63.929z M88.484,73.433c3.12,0,4.68-1.656,4.68-4.968 v-4.536h-9.36v4.536C83.804,71.778,85.363,73.433,88.484,73.433z" />
					<path strokeDasharray={`${progress * 164}, 164`}  d="M103.496,132.689 c-2.232,3.983-5.34,7.139-9.324,9.468c-3.985,2.328-8.472,3.492-13.464,3.492c-4.993,0-9.48-1.165-13.464-3.492 c-3.985-2.329-7.104-5.497-9.36-9.504c-2.257-4.008-3.384-8.388-3.384-13.14c0-4.8,1.127-9.205,3.384-13.212 c2.256-4.008,5.375-7.189,9.36-9.54c3.983-2.353,8.471-3.528,13.464-3.528c4.992,0,9.479,1.175,13.464,3.528 c3.984,2.351,7.092,5.532,9.324,9.54c2.232,4.007,3.348,8.412,3.348,13.212C106.844,124.312,105.728,128.704,103.496,132.689z  M89.024,112.096c-2.041-1.728-4.813-2.592-8.316-2.592c-3.456,0-6.205,0.864-8.244,2.592c-2.041,1.728-3.06,4.2-3.06,7.416 c0,3.168,1.02,5.616,3.06,7.344c2.04,1.728,4.788,2.592,8.244,2.592c3.503,0,6.275-0.864,8.316-2.592 c2.04-1.728,3.06-4.176,3.06-7.344C92.084,116.296,91.063,113.824,89.024,112.096z" />
					<path strokeDasharray={`${progress * 385}, 385`}  d="M105.98,224.848l-50.976-11.664v-19.872 l28.944-5.904l-28.944-5.904v-19.872l50.976-11.664v17.208l-32.112,4.608l32.112,6.912v17.424l-32.112,6.912l32.112,4.608V224.848z " />
					<path strokeDasharray={`${progress * 237}, 237`}  d="M93.308,246.592h-6.336v15.84H74.948v-15.84h-7.2 v18H55.004v-33.984h50.976v33.984H93.308V246.592z" />
					<path strokeDasharray={`${progress * 217}, 217`}  d="M55.004,296.271l18.288-9.648H55.004v-15.983 h50.976v23.76c0,4.128-0.732,7.655-2.196,10.584c-1.464,2.927-3.456,5.123-5.976,6.588c-2.52,1.464-5.364,2.196-8.532,2.196 c-3.409,0-6.433-0.948-9.072-2.845c-2.641-1.896-4.536-4.62-5.688-8.172l-19.512,11.088V296.271z M83.948,286.623v6.336 c0,1.536,0.348,2.688,1.044,3.456c0.695,0.768,1.788,1.152,3.276,1.152c1.343,0,2.399-0.396,3.168-1.188 c0.767-0.792,1.152-1.933,1.152-3.42v-6.336H83.948z" />
					<path strokeDasharray={`${progress * 164}, 164`}  d="M103.496,369.135 c-2.232,3.983-5.34,7.139-9.324,9.468c-3.985,2.327-8.472,3.492-13.464,3.492c-4.993,0-9.48-1.165-13.464-3.492 c-3.985-2.329-7.104-5.497-9.36-9.504c-2.257-4.009-3.384-8.389-3.384-13.141c0-4.8,1.127-9.204,3.384-13.212 c2.256-4.008,5.375-7.188,9.36-9.54c3.983-2.353,8.471-3.527,13.464-3.527c4.992,0,9.479,1.175,13.464,3.527 c3.984,2.352,7.092,5.532,9.324,9.54c2.232,4.008,3.348,8.412,3.348,13.212S105.728,365.15,103.496,369.135z M89.024,348.543 c-2.041-1.728-4.813-2.592-8.316-2.592c-3.456,0-6.205,0.864-8.244,2.592c-2.041,1.729-3.06,4.2-3.06,7.416 c0,3.168,1.02,5.616,3.06,7.345c2.04,1.728,4.788,2.592,8.244,2.592c3.503,0,6.275-0.864,8.316-2.592 c2.04-1.729,3.06-4.177,3.06-7.345C92.084,352.743,91.063,350.271,89.024,348.543z" />
					<path strokeDasharray={`${progress * 202}, 202`}  d="M105.98,423.854H93.308v-20.016h-7.056v14.399 H74.228v-14.399H55.004v-15.984h50.976V423.854z" />
					<path strokeDasharray={`${progress * 172}, 172`}  d="M51.636,38.946H18.731 c-6.096,0-10.716-1.596-13.859-4.788C1.728,30.965,0.156,26.49,0.156,20.73c0-6.192,1.703-11.113,5.111-14.76 c3.408-3.648,8.376-5.472,14.904-5.472v15.768c-2.064,0-3.517,0.335-4.356,1.008c-0.84,0.671-1.26,1.584-1.26,2.736 c0,0.959,0.312,1.703,0.937,2.232c0.623,0.528,1.703,0.792,3.239,0.792h32.905V38.946z" />
					<path strokeDasharray={`${progress * 193}, 193`}  d="M8.364,78.546V61.553l-7.704-2.52V42.258 l50.976,18.648v18.432L0.66,97.913V81.066L8.364,78.546z M20.388,74.657l14.185-4.608l-14.185-4.608V74.657z" />
					<path strokeDasharray={`${progress * 235}, 235`}  d="M51.636,114.906l-35.064,10.512l35.064,10.44 v16.992L0.66,135.713V115.05l50.976-17.136V114.906z" />
					<path strokeDasharray={`${progress * 193}, 193`}  d="M8.364,189.136v-16.992l-7.704-2.52v-16.776 l50.976,18.648v18.432L0.66,208.504v-16.848L8.364,189.136z M20.388,185.248l14.185-4.608l-14.185-4.608V185.248z" />
					<path strokeDasharray={`${progress * 239}, 239`}  d="M7.788,249.219 c-2.353-1.512-4.212-3.708-5.58-6.588s-2.052-6.313-2.052-10.295c0-6.096,1.428-11.124,4.283-15.084s7.044-6.109,12.564-6.444 V227.8c-2.929,0.24-4.392,1.536-4.392,3.888c0,0.815,0.216,1.476,0.647,1.98c0.433,0.503,1.056,0.755,1.872,0.755 c1.199,0,2.147-0.611,2.844-1.835c0.695-1.224,1.5-3.204,2.412-5.94c1.056-3.216,2.136-5.893,3.24-8.028 c1.104-2.137,2.736-3.996,4.896-5.58c2.16-1.584,4.969-2.376,8.425-2.376c3.312,0,6.131,0.852,8.46,2.556 c2.328,1.704,4.092,4.032,5.292,6.984c1.199,2.952,1.8,6.275,1.8,9.972c0,6.095-1.416,10.944-4.248,14.543 c-2.833,3.601-6.912,5.568-12.24,5.904v-17.208c2.688-0.241,4.032-1.345,4.032-3.312c0-0.673-0.205-1.224-0.612-1.656 c-0.408-0.432-1.021-0.648-1.836-0.648c-1.105,0-2.005,0.612-2.701,1.836c-0.696,1.224-1.5,3.132-2.411,5.724 c-1.152,3.264-2.293,5.964-3.421,8.1s-2.784,4.008-4.968,5.616c-2.185,1.607-4.98,2.412-8.388,2.412 C12.779,251.488,10.14,250.732,7.788,249.219z" />
					<path strokeDasharray={`${progress * 236}, 236`}  d="M49.656,292.708 c-1.656,3.479-3.996,6.312-7.02,8.496c-3.024,2.184-6.552,3.636-10.584,4.356v-16.849c1.68-0.769,2.988-1.86,3.924-3.275 c0.936-1.417,1.404-3.037,1.404-4.86c0-2.688-1.008-4.813-3.025-6.372c-2.016-1.561-4.728-2.34-8.136-2.34s-6.12,0.779-8.136,2.34 c-2.016,1.56-3.024,3.684-3.024,6.372c0,1.823,0.469,3.443,1.404,4.86c0.937,1.415,2.243,2.507,3.924,3.275v16.849 c-4.032-0.721-7.56-2.173-10.584-4.356c-3.023-2.185-5.364-5.017-7.02-8.496c-1.656-3.48-2.484-7.429-2.484-11.844 c0-5.137,1.092-9.601,3.276-13.393c2.184-3.792,5.243-6.708,9.18-8.747c3.936-2.041,8.424-3.061,13.464-3.061 s9.527,1.02,13.464,3.061c3.936,2.039,6.995,4.955,9.18,8.747c2.184,3.792,3.276,8.256,3.276,13.393 C52.14,285.279,51.312,289.227,49.656,292.708z" />
					<path strokeDasharray={`${progress * 217}, 217`}  d="M0.66,336.951l18.288-9.647H0.66v-15.984h50.976 v23.76c0,4.128-0.732,7.656-2.196,10.584c-1.464,2.928-3.456,5.124-5.976,6.589c-2.52,1.463-5.364,2.195-8.533,2.195 c-3.408,0-6.433-0.948-9.071-2.844c-2.641-1.896-4.536-4.62-5.688-8.172L0.66,354.519V336.951z M29.604,327.303v6.336 c0,1.535,0.348,2.688,1.044,3.456c0.695,0.767,1.788,1.151,3.276,1.151c1.344,0,2.4-0.396,3.168-1.188 c0.767-0.792,1.152-1.933,1.152-3.42v-6.336H29.604z" />
					<path strokeDasharray={`${progress * 133}, 133`}  d="M51.636,375.543H0.66v-15.983h50.976V375.543z" />
					<path strokeDasharray={`${progress * 170}, 170`}  d="M16.86,398.726H0.66v-15.984h50.976v22.32 c0,6.239-1.584,11.027-4.752,14.364c-3.168,3.335-7.416,5.004-12.745,5.004c-3.216,0-6.132-0.745-8.748-2.232 c-2.616-1.488-4.692-3.685-6.228-6.588c-1.537-2.904-2.304-6.42-2.304-10.548V398.726z M34.14,408.23 c3.12,0,4.681-1.656,4.681-4.968v-4.536h-9.36v4.536C29.46,406.574,31.02,408.23,34.14,408.23z" />
					<path strokeDasharray={`${progress * 187}, 187`}  d="M51.636,469.502H38.964v-13.536H0.66v-15.984 h38.304V426.59h12.672V469.502z" />
				</g>
			</animated.svg>
		</div>
	);
};

export default PowerOfJavaScript;
