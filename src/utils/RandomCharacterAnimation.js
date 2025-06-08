"use strict";

export default function RandomCharacterAnimation(options) {
  let defaults = {
    d_element: "",
    d_type: "char",
    d_min: 10,
    d_max: 100,
    d_kerning: 10,
  };

  this.size;
  this.getLettersArray = [];
  this.getLettersChanges = [];
  this.kerningSize = [];
  this.currentChange = 0;
  this.char = "abcdefghijklmnopqrstuvwxyz0123456789!?*Σ()@$%&_-+=[]{}:;<>./";
  this.charArray = [];
  this.requestId;

  this.options = { ...defaults, ...options };

  this._random = function (minNb, maxNb) {
    return Math.floor(Math.random() * (maxNb - minNb) + minNb);
  };

  this._getElementSize = function () {
    const element_selected = document.querySelector(
      this.options.d_element
    ).textContent;
    for (let i = 0; i < element_selected.length; i++) {
      this.getLettersArray.push(element_selected[i]);
    }
    return this.getLettersArray;
  };

  this._setStructure = function () {
    const element = document.querySelector(this.options.d_element);
    element.innerHTML = "";

    for (let i = 0; i < this.getLettersArray.length; i++) {
      const characterContainer = document.createElement("span");
      const array = this.getLettersArray[i];
      characterContainer.classList.add("randomCharacter");
      characterContainer.innerHTML = array === " " ? " " : array;
      characterContainer.style.opacity = "0";
      element.appendChild(characterContainer);
    }
  };

  this._setKerning = function () {
    const elem = document.querySelector(this.options.d_element);

    for (let i = 0; i < this.getLettersArray.length; i++) {
      const container = elem.querySelector(
        ".randomCharacter:nth-child(" + (i + 1) + ")"
      );
      container.style.padding =
        "0" + Math.sqrt(this.options.d_kerning) / container.offsetWidth + "px";
      const kerningSize = container.offsetWidth;
      this.kerningSize.push(kerningSize);
      container.style.width = kerningSize + "px";
    }
  };

  this._convertStringToArray = function () {
    for (let i = 0; i < this.char.length; i++) {
      this.charArray.push(this.char[i]);
    }
  };

  this._setChange = function () {
    for (let i = 0; i < this.getLettersArray.length; i++) {
      const setChange = this._random(this.options.d_min, this.options.d_max);
      this.getLettersChanges.push(setChange);
    }
  };

  this._generateRandomCharacter = function () {
    this.currentChange++;
    const elem = document.querySelector(this.options.d_element);
    const chooseRandomLetter = this._random(0, this.getLettersArray.length);
    const changesPlaces = elem.querySelector(
      ".randomCharacter:nth-child(" + (chooseRandomLetter + 1) + ")"
    );
    const getChar = this._random(0, this.charArray.length);
    const generateContent = this.charArray[getChar];
    changesPlaces.innerHTML = generateContent;
    changesPlaces.style.opacity = "1";
    elem.style.opacity = "1";
  };

  this._checkNbChanges = function () {
    const elem = document.querySelector(this.options.d_element);
    for (let i = 0; i < this.getLettersArray.length; i++) {
      const thisChar = this.getLettersChanges[i];
      const thisContainer = elem.querySelector(
        ".randomCharacter:nth-child(" + (i + 1) + ")"
      );
      if (this.currentChange > thisChar) {
        thisContainer.innerHTML = this.getLettersArray[i];
      }
    }
  };

  this._loop = () => {
    this.requestId = requestAnimationFrame(() => {
      this._loop();
      if (this.currentChange > this.options.d_max) {
        this.stop();
      }
    });
    this._generateRandomCharacter();
    this._checkNbChanges();
  };

  this.restart = function () {
    this.currentChange = 0;
    this._setChange();
    this._loop();
  };

  this.start = function () {
    this._getElementSize();
    this._setStructure();
    this._setKerning();
    this._setChange();
    this._convertStringToArray();
    this._loop();
  };

  this.stop = function () {
    window.cancelAnimationFrame(this.requestId);

    // 🧩 FORÇA RESTAURAR TEXTO FINAL!
    const elem = document.querySelector(this.options.d_element);
    if (elem) {
      elem.innerHTML = this.getLettersArray
        .map((letter) => {
          if (letter === " ") return "&nbsp;";
          return letter;
        })
        .join("");
    }
  };
}
