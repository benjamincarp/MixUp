function component () {
    var element = document.createElement('div');

    element.innerHTML = 'Hello MixUp';

    return element;
}

document.body.appendChild(component());