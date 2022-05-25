import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

export const DevMachine: React.FC<{ text?: string }> = ({ text = 'empty' }) => {
	const frame = useCurrentFrame();

	const { fps } = useVideoConfig();
	const DURATION = fps * 3;

	const opacity = interpolate(frame, [0, 30, 60, 90], [0, 1, 1, 0]);

	return (
		<div style={{ flex: 1, backgroundColor: 'black'	}}>
			<Sequence name="empty" from={0} durationInFrames={DURATION}>
				<AbsoluteFill style={{
					border: '5px solid blue',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
					{/* Custom text */}
					<p style={{
						color: 'white',
						fontSize: '200px',
						opacity,
					}}>{ text }</p>

				</AbsoluteFill>
			</Sequence>
		</div>
	);
};
