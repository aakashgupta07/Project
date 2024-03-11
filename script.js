const fileInput = document.querySelector(".file-input"),
filterOption = document.querySelectorAll(".filter button"),
previewImg = document.querySelector(".img-preview img"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOption = document.querySelectorAll(".rotate button"),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img"),
resetFilterBtn = document.querySelector(".reset-filters");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;

let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilter = () =>
{
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;

  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
}


const loadImage = () => 
  {
    let file = fileInput.files[0]; //getting user selected files
    if(!file) return; //return if users hasnt selected any file
    console.log(file);
    previewImg.src = URL.createObjectURL(file); //passing file url as preview img src
    previewImg.addEventListener("load", () =>
    {
      resetFilterBtn.click();
     document.querySelector(".container").classList.remove("disable");
  });
}

filterOption.forEach(Option => 
  {
    Option.addEventListener("click", () => //adding click event listner to all filters buttons
    {
      document.querySelector(".filter .active").classList.remove("active");
      Option.classList.add("active");
      filterName.innerText = Option.innerText;

      if(Option.id === "Brightness")
      {
        filterSlider.max = "200";
        filterSlider.value = brightness;
        filterValue.innerText = `${brightness}%`;
      } else if (Option.id === "Saturation")
      {
        filterSlider.max = "200";
        filterSlider.value = saturation;
        filterValue.innerText = `${saturation}%`;
      } else if (Option.id === "Inversion")
      {
        filterSlider.max = "100";
        filterSlider.value = inversion;
        filterValue.innerText = `${inversion}%`;
      } else if (Option.id === "Grayscale")
      {
        filterSlider.max = "100";
        filterSlider.value = grayscale;
        filterValue.innerText = `${grayscale}%`;
      }
    });
});

const updatefilter = () =>
  {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active"); // getting selected filetr btn

    if(selectedFilter.id === "Brightness")
    {
      brightness = filterSlider.value;
    } else if (selectedFilter.id === "Saturation")
      {
        saturation = filterSlider.value;
    } else if (selectedFilter.id === "Inversion")
    {
      inversion = filterSlider.value;
  } else if (selectedFilter.id === "Grayscale")
    {
    grayscale = filterSlider.value;
  }
  applyFilter();
}

  rotateOption.forEach(Option =>
  {
    Option.addEventListener("click", () => { //adding click event listner to all rotate buttons
      if(Option.id === "left")
      {
        rotate -=90;
      } else if(Option.id === "right")
      {
        rotate +=90;
      } else if(Option.id === "vertical")
      {
        flipVertical = flipVertical === 1 ? -1 : 1;
      } else (Option.id === "horizontal")
      {
        flipHorizontal = flipHorizontal === 1 ? -1 : 1;
      }
      applyFilter();
    }); 
  });

  const resetfilter = () =>
  {
    brightness = 100, saturation = 100, inversion = 0, grayscale = 0;

    rotate = 0, flipHorizontal = 1, flipVertical = 1;
    filterOption[0].click();
    applyFilter();
  }

  const saveimg = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
  }

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updatefilter);
resetFilterBtn.addEventListener("click", resetfilter);
saveImgBtn.addEventListener("click", saveimg);
chooseImgBtn.addEventListener("click" , () => fileInput.click());
