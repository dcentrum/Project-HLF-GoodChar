export const getIconFromName = name => {
	if (name.includes('Blood')) {
		return require('../../assets/blood_drop.png');
	} else if (name.includes('Blanket')) {
		return require('../../assets/blanket.png');
	} else if (name.includes('Cloth')) {
		return require('../../assets/cloth.png');
	} else if (name.includes('Book')) {
		return require('../../assets/books.png');
	} else if (name.includes('Food')) {
		return require('../../assets/food.png');
	} else {
		return require('../../assets/icon_gc.png');
	}
};
