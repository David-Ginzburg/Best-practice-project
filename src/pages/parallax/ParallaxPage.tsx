import "./parallax.css";

export const ParallaxPage = () => {
	return (
		<div className="parallax-page-container">
			<div id="title" className="slide header">
				<h1>Pure CSS Parallax</h1>
			</div>

			<div id="slide1" className="slide">
				<div className="title">
					<h1>Slide 1</h1>
					<p>
						Lorem ipsum dolor sit amet, in velit iudico mandamus sit, persius dolorum in per,
						postulant mnesarchum cu nam. Malis movet ornatus id vim, feugait detracto est ea, eam
						eruditi conceptam in. Ne sit explicari interesset. Labores perpetua cum at. Id viris
						docendi denique vim.
					</p>
				</div>
			</div>

			<div id="slide2" className="slide">
				<div className="title">
					<h1>Slide 2</h1>
					<p>
						Lorem ipsum dolor sit amet, in velit iudico mandamus sit, persius dolorum in per,
						postulant mnesarchum cu nam. Malis movet ornatus id vim, feugait detracto est ea, eam
						eruditi conceptam in. Ne sit explicari interesset. Labores perpetua cum at. Id viris
						docendi denique vim.
					</p>
				</div>
				<img src="https://picsum.photos/980/600" alt="Parallax image 1" />
				<img src="https://picsum.photos/960/600" alt="Parallax image 2" />
			</div>

			<div id="slide3" className="slide">
				<div className="title">
					<h1>Slide 3</h1>
					<p>
						Lorem ipsum dolor sit amet, in velit iudico mandamus sit, persius dolorum in per,
						postulant mnesarchum cu nam. Malis movet ornatus id vim, feugait detracto est ea, eam
						eruditi conceptam in. Ne sit explicari interesset. Labores perpetua cum at. Id viris
						docendi denique vim.
					</p>
				</div>
			</div>

			<div id="slide4" className="slide header">
				<h1>The End</h1>
			</div>
		</div>
	);
};
