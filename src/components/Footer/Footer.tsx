//? Core
import React, { FunctionComponent } from 'react';
//? Components
import DirectionalFader from './components/DirectionalFader';

const Footer: FunctionComponent = () => {
	return (
		<footer>
			<div className="socials">
				<a className="socialLink" target="__blank" href="https://www.instagram.com/kudlacekvojtech/">
					<DirectionalFader delay={400}>Instagram</DirectionalFader>
				</a>
				<a className="socialLink" target="__blank" href="https://www.linkedin.com/in/vojt%C4%9Bch-kudl%C3%A1%C4%8Dek-39a826145/">
					<DirectionalFader delay={700}>LinkedIn</DirectionalFader>
				</a>
				<a className="socialLink" target="__blank" href="#">
					<DirectionalFader delay={1000}>YouTube</DirectionalFader>
				</a>
			</div>
			<div className="contacts">
				<DirectionalFader className="contact" delay={1000}>vjtkudlacek@gmail.com</DirectionalFader>
				<DirectionalFader className="contact" delay={400}>+420 735 854 688</DirectionalFader>
			</div>
		</footer>
	);
};

export default Footer;
