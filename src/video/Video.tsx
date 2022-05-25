import { Composition } from 'remotion';
import { DevMachine } from './DevMachine'

export const RemotionVideo: React.FC = () => {
	const FPS = 30;
	const DURATION_IN_SECONDS = 3;
	
	return (
		<>
			<Composition
				id="landscape-dev-machine"
				component={DevMachine}
				durationInFrames={FPS * DURATION_IN_SECONDS}
				fps={FPS}
				width={1920}
				height={1080}
			/>
			<Composition
				id="portrait-dev-machine"
				component={DevMachine}
				durationInFrames={FPS * DURATION_IN_SECONDS}
				fps={FPS}
				width={500}
				height={640}
			/>
		</>
	);
};
