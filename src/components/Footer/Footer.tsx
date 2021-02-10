import { FunctionComponent } from 'react';

const Footer: FunctionComponent = () => {
	return (
		<footer>
			<div className="socials">
				<a className="socialLink" target="__blank" href="https://www.instagram.com/kudlacekvojtech/">
					Instagram
				</a>
				<a className="socialLink" target="__blank" href="https://www.linkedin.com/in/vojt%C4%9Bch-kudl%C3%A1%C4%8Dek-39a826145/">
					LinkedIn
				</a>
				<a className="socialLink" target="__blank" href="#">
					YouTube
				</a>
			</div>
			<div className="contacts">
				vjtkudlacek@gmail.com
				+420 735 854 688
			</div>
		</footer>
	);
};

export default Footer;
