function rPer(per) {
	return Math.random() < per;
}
function rNum(one, two='p', round=true) {
	var min, max;
	if(two == 'p') {
		min = 0;
		max = Math.ceil(one);
	} else {
		min = Math.ceil(one);
		max = Math.ceil(two);
	}
	if(round)
		return min + Math.floor(Math.random() * (max-min+(two!='p')));
	else
		return min + Math.random() * (max-min+(two!='p'));
}
function rItem() {
	var list;
	if(arguments.length == 1)
		list = arguments[0];
	else
		list = arguments;
	
	var n = rNum(list.length);
	return list[n];
}
function rWeight(items, weights) {
	var i;

	for (i = 0; i < weights.length; i++)
			weights[i] += weights[i - 1] || 0;
	
	var random = Math.random() * weights[weights.length - 1];
	
	for (i = 0; i < weights.length; i++)
			if (weights[i] > random)
					break;
	
	return items[i];
}
function minpos() {
	var list;
	if(arguments.length == 1)
		list = arguments[0];
	else
		list = arguments;
	var min = Infinity;
	var pos = [];
	for (let i = 0; i < list.length; i++) {
		if(list[i] < min) {
			pos = [i];
			min = list[i];
		} else if(list[i] == min) {
			pos.push(i);
		}
	}
	return pos;
}
function maxpos() {
	var list;
	if(arguments.length == 1)
		list = arguments[0];
	else
		list = arguments;
	var max = -Infinity;
	var pos = [];
	for (let i = 0; i < list.length; i++) {
		if(list[i] > max) {
			pos = [i];
			max = list[i];
		} else if(list[i] == max) {
			pos.push(i);
		}
	}
	return pos;
}
function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}