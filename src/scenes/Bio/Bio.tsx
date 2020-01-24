//? Core
import React, { FunctionComponent } from 'react';
//? Utils
import { calculateAge } from 'utils/ageCalculator';
import { getBioPadding } from 'utils/responsiveSizes';
//? Components
import SideLink from 'components/SideLink';
import BackgroundImage from 'components/BackgroundImage';
import BackgroundWrap from 'components/BackgroundWrap';
import SideLinkWrap from 'components/SideLinkWrap';
import Content from 'components/Content';
import TextSection from 'components/TextSection';

const Bio: FunctionComponent = () => {
	const age = calculateAge(1998, 4, 9);
	return (
		<>
			<BackgroundWrap>
				<BackgroundImage image="bio" />
			</BackgroundWrap>
			<Content>
				<div style={{ paddingLeft: getBioPadding() }}>
					<TextSection title="A Little About Me" delay={0} requiredWidth={412}>
						<p>Hey, I'm Vojtěch, {age} years old guy from Děčín, Czech Republic.</p>
						<p>In three words?</p>
						<p>I would call myself minimalist, optimist and programmer.</p>
					</TextSection>
					<TextSection title="Some Professional Background" delay={200} requiredWidth={653}>
						<p>It was year 2015 and I started as everyone... as PHP developer.</p>
						<p>One and a half years passed and I moved to something more interesting. JavaScript.</p>
						<p>I started with cool technologies like Node.js and web sockets.</p>
						<p>Soon after I started being interested in frontend frameworks and begun learning Angular.</p>
						<p>After a while I swapped Angular with React.</p>
						<p>Since then, I'm trying to work with modern technologies and stick with the trends.</p>
						<p>Currently working as full stack JavaScript/TypeScript developer with React, Node.js and GraphQL.</p>
					</TextSection>
					<TextSection title="Free Time?" delay={400} requiredWidth={490}>
						<p>Heh, what is this? Okay, jokes aside.</p>
						<p>What I really love is to travel.</p>
						<p>It is basically my lifelong dream to travel around the world.</p>
						<p>I also like to take pictures of everything. To keep my memories recorded.</p>
					</TextSection>
					<TextSection title="Epilogue" delay={600} requiredWidth={305}>
						<p>And that's pretty much me.</p>
						<p>Any questions? Don't hesitate to contact me.</p>
					</TextSection>
				</div>
			</Content>
			<SideLinkWrap>
				<SideLink to="/projects" side="left">Projects</SideLink>
				<SideLink to="/" side="right">Home</SideLink>
			</SideLinkWrap>
		</>
	);
};

export default Bio;
