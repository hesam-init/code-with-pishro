export type FaceType = { minErrors: number; asset: string };

export const FacesList: Array<FaceType> = [
	{ minErrors: 0, asset: "1.webp" },
	{ minErrors: 1, asset: "2.webp" },
	{ minErrors: 5, asset: "3.webp" },
	{ minErrors: 10, asset: "4.webp" },
	{ minErrors: 15, asset: "5.webp" },
	{ minErrors: 20, asset: "6.webp" },
	{
		minErrors: 25,
		asset: "7.png",
	},
	{ minErrors: 30, asset: "8.webp" },
	{ minErrors: 35, asset: "9.webp" },
	{ minErrors: 40, asset: "10.webp" },
].reverse();
