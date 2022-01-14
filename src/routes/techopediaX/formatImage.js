const Jimp = require('jimp');
const path = require('path');

let image, font44, font36;

(async () => {
	image = await Jimp.read(
		path.join(__dirname, './receipt-files/receipt.png')
	);
	console.log('Image Loaded');
})();

(async () => {
	font44 = await Jimp.loadFont(
		path.join(__dirname, './receipt-files/font44.fnt')
	);
	console.log('Font 44 Loaded');
})();

(async () => {
	font36 = await Jimp.loadFont(
		path.join(__dirname, './receipt-files/font36.fnt')
	);
	console.log('Font 36 Loaded');
})();

module.exports = async (body) => {
	try {
		let xCoord = 326;
		let yCoord = 782;

		body.x?.forEach((name) => {
			image.print(
				font36,
				xCoord,
				yCoord,
				{
					text: name,
					alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
					alignmentY: Jimp.VERTICAL_ALIGN_TOP
				},
				image.getWidth(),
				image.getHeight()
			);
			yCoord += 61;
		});

		image.print(
			font36,
			xCoord,
			1097,
			{
				text: body.a,
				alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
				alignmentY: Jimp.VERTICAL_ALIGN_TOP
			},
			image.getWidth(),
			image.getHeight()
		);

		image.print(
			font36,
			xCoord,
			1290,
			{
				text: body.b,
				alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
				alignmentY: Jimp.VERTICAL_ALIGN_TOP
			},
			image.getWidth(),
			image.getHeight()
		);

		image.print(
			font36,
			xCoord,
			1483,
			{
				text: body.c,
				alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
				alignmentY: Jimp.VERTICAL_ALIGN_TOP
			},
			image.getWidth(),
			image.getHeight()
		);

		// image.rotate(-90);

		// image.print(
		// 	font44,
		// 	843,
		// 	1190,
		// 	{
		// 		text: body.d,
		// 		alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
		// 		alignmentY: Jimp.VERTICAL_ALIGN_TOP
		// 	},
		// 	image.getWidth(),
		// 	image.getHeight()
		// );

		// image.rotate(90);

		let data = await image.getBase64Async(Jimp.MIME_PNG);
		return { message: true, data };
	} catch (e) {
		console.log(e);
		return { message: false };
	}
};
