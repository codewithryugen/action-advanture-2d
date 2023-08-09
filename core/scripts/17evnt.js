"use strict";
window.addEventListener('load',()=>{
    const layar = document.querySelector("canvas");
    const konteks = layar.getContext("2d");
    let kameraX = 0;
    let kameraY = 0;
    let skalaKamere = 10;
    const kecepatanBerjalan = 3;
    const kecepatanBerlari = 1;
    const kumpulanPartikel = [];
    const kumpulanTembokKiri = [];
    const kumpulanTembokBawah = [];
    const kumpulanTembokAtas = [];
    const kumpulanSudutTembokKiri = [];
    const kumpulanSudutTembokKananAtas = [];
    const kumpulanSudutTembokKananBawah = [];
    const kumpulanSudutTembokBawah = [];
    const kumpulanTembokKanan = [];
    const kumpulanAirSungai = [];
    const kumpulanPasir = [];
    const kumpulanSemakKecilX=[];
    const kumpulanSemakKecilY=[];
    const kumpulanKarakterNpc = [];
    const kumpulanPohon = [];
    const kumpulanRumah = [];

   
    const gambarPemain = new Image();
    gambarPemain.src ="./core/resource/player.png";
    const objek1 = new Image();
    objek1.src ="./core/resource/objects.png";
    const gambarnpc = new Image();
    gambarnpc.src = "./core/resource/NPC.png";
    const duniaLuar = new Image();
    duniaLuar.src="./core/resource/dunia.png";



    const aturUkuranLayar = () =>  {
        layar.width = window.innerWidth;
        layar.height = window.innerHeight;
    }

    // Utility 


    


    window.addEventListener('resize', aturUkuranLayar);
    aturUkuranLayar();

    const lebarLayar = layar.width;
    const tinggiLayar = layar.height;

    // console.log(lebarLayar);
    // console.log(tinggiLayar);

    const cekOrientasi = () => {
        return lebarLayar>tinggiLayar?false:true;
    }
    if (cekOrientasi()){
        console.log("miringkan layar");
        layar.style.display="none";
    }

    const elemenPetaKecil = document.createElement("canvas");
    elemenPetaKecil.width=100;
    elemenPetaKecil.height=100;

    const petaDunia = [
        [9,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,19],
        [1,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,11],
        [1,13,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,9,7,7,7,7,7,7,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,1,12,12,12,12,12,12,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,1,12,12,12,12,12,12,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,1,12,12,12,12,12,12,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,6,5,5,5,5,5,5,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,11],
        [1,13,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,11],
        [1,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,11],
        [6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,8],
    ];

    class Music {
        
    }

    class PopUpEvent {
        

    }

    /*
        membuat unsur" 
        berbau kemerdekaan RI

    */

    class PetaKecil{
        static ukuranLebarPeta = 15;
        static ukuranTinggiPeta = 15;
        constructor(x,y){
           this.x=Math.floor(x/10)-PetaKecil.ukuranLebarPeta;
           this.y=y;
           console.log(this.x);
        }
        gambarPeta(){
            konteks.fillStyle="red";
            konteks.fillRect(this.x,this.y,PetaKecil.ukuranLebarPeta,PetaKecil.ukuranTinggiPeta);
        }
    }

    class SemakKecilY{
        static ukuran = 5;
        constructor({posisi}){
            this.posisi=posisi;
        }
        buatBentuk(){
            konteks.fillStyle="rgba(0,0,0,0.0)";
            konteks.fillRect(this.posisi.x,this.posisi.y,SemakKecilY.ukuran,SemakKecilY.ukuran);
            konteks.drawImage(duniaLuar,1*16,4*16,16,16,this.posisi.x,this.posisi.y,SemakKecilY.ukuran,SemakKecilY.ukuran);
        }
    }

    class SemakKecilX {
        static ukuran = 5;
        constructor({posisi}){
            this.posisi=posisi;
        }
        buatBentuk(){
            konteks.fillStyle="rgba(0,0,0,0.0)";
            konteks.fillRect(this.posisi.x,this.posisi.y,SemakKecilX.ukuran,SemakKecilX.ukuran);
            
            konteks.drawImage(duniaLuar,0*16,14*16,16,16,this.posisi.x,this.posisi.y,SemakKecilX.ukuran,SemakKecilX.ukuran);
        }
    }

    class Pohon {
        static ukuran = 5;
        constructor({posisi}){
            this.posisi=posisi;
        }
        buatBentuk(){
            konteks.fillStyle="rgba(0,255,0,0.0)";
            konteks.fillRect(this.posisi.x,this.posisi.y,Pohon.ukuran,Pohon.ukuran);

            // drawImage(gambarPemain,sx,sy,sw,sh,x,y,10,10)
            konteks.drawImage(duniaLuar,0,0,16,16,this.posisi.x,this.posisi.y,Pohon.ukuran,Pohon.ukuran);
            konteks.drawImage(objek1,0-2,80.3,50,63.4,this.posisi.x,this.posisi.y,Pohon.ukuran,Pohon.ukuran);
            // konteks.strokeRect(this.posisi.x,this.posisi.y,Pohon.ukuran,Pohon.ukuran);
        }
    }

   

    class Rumah {
        static ukuran = 5;
        constructor({posisi}){
            this.posisi=posisi;
        }
        buatBentuk(){
            konteks.fillStyle="rgba(244,244,044)";
            konteks.fillRect(this.posisi.x,this.posisi.y,Rumah.ukuran,Rumah.ukuran);
            // konteks.strokeRect(this.posisi.x,this.posisi.y,Pohon.ukuran,Pohon.ukuran);
        }
    }

    class Pemain {
        static lebartSprit = 288;
        static tinggiSprit = 480;
        static kecepatan = 0;
        static lebar = 48;
        static tinggi = 48;
        static fremX = 0;
        static fremY = 0;
        static frem = 0;
        static tingkatFrem = 5;
        constructor({posisi,perpindahan}){
            this.posisi=posisi;
            this.perpindahan=perpindahan;
            this.ukuran=1;
            this.nama="Rafi";
            this.nyawa=100;
            this.aktifitas = {
                diamAtas:false,
                diamBawah:false,
                diamKiri:false,
                diamKanan:false,
                lariKeAtas:false,
                lariKeBawah:false,
                lariKeKanan:false,
                lariKeKiri:false,
                serang:false,
            }
            // console.log(Pemain.kecepatan)

        }
        buatBentuk(){
            konteks.beginPath();
            konteks.fillStyle="rgba(0,0,0,0.0)";
            // konteks.fillStyle="red";
            konteks.arc(this.posisi.x,this.posisi.y,this.ukuran,0,Math.PI*2);
            konteks.fill();
            konteks.closePath();

            
            if(!this.aktifitas.diamKiri) konteks.drawImage(gambarPemain,Pemain.fremX*Pemain.lebar,Pemain.fremY*Pemain.tinggi,Pemain.lebar,Pemain.tinggi,this.posisi.x-5,this.posisi.y-7.5,10,10);

            // item yang di miliki pemain

            konteks.beginPath();
            // konteks.fillStyle="red";
            // konteks.font="2px courier";
            // konteks.fillText(this.nama,this.posisi.x-this.nama.length/2,this.posisi.y-4);
            konteks.closePath();


        }
        diamAtas(){
            konteks.drawImage(gambarPemain,Pemain.fremX*Pemain.lebar,Pemain.fremY*Pemain.tinggi,Pemain.lebar,Pemain.tinggi,this.posisi.x-5,this.posisi.y-7.5,10,10);
            Pemain.fremY = 2;
            if(Pemain.frem % Pemain.tingkatFrem == 0){
                if(Pemain.fremX < 5)Pemain.fremX++
                else Pemain.fremX = 0;
            }
        }
        diamBawah(){
            konteks.drawImage(gambarPemain,Pemain.fremX*Pemain.lebar,Pemain.fremY*Pemain.tinggi,Pemain.lebar,Pemain.tinggi,this.posisi.x-5,this.posisi.y-7.5,10,10);
            Pemain.fremY = 0;
            if(Pemain.frem % Pemain.tingkatFrem == 0){
                if(Pemain.fremX < 5)Pemain.fremX++
                else Pemain.fremX = 0;
            }
        }
        diamKiri(){
            konteks.save();
            konteks.translate(this.posisi.x-19, this.posisi.y+16.8); 
            konteks.scale(-1, 1);
            konteks.drawImage(gambarPemain,Pemain.fremX*Pemain.lebar,Pemain.fremY*Pemain.tinggi,Pemain.lebar,Pemain.tinggi,-Pemain.lebar/2,-Pemain.tinggi/2,10,10);
            konteks.restore();
            Pemain.fremY = 1;
            if(Pemain.frem % Pemain.tingkatFrem == 0){
                if(Pemain.fremX < 5) Pemain.fremX++
                else Pemain.fremX = 0;
            }
        }
        diamKanan(){
            konteks.drawImage(gambarPemain,Pemain.fremX*Pemain.lebar,Pemain.fremY*Pemain.tinggi,Pemain.lebar,Pemain.tinggi,this.posisi.x-5,this.posisi.y-7.5,10,10);
            Pemain.fremY = 1;
            if(Pemain.frem % Pemain.tingkatFrem == 0){
                if(Pemain.fremX < 5) Pemain.fremX++
                else Pemain.fremX = 0;
            }
        }
        lariKeAtas(){
            konteks.drawImage(gambarPemain,Pemain.fremX*Pemain.lebar,Pemain.fremY*Pemain.tinggi,Pemain.lebar,Pemain.tinggi,this.posisi.x-5,this.posisi.y-7.5,10,10);
            Pemain.fremY = 5;
            if(Pemain.frem % Pemain.tingkatFrem == 0){
                if(Pemain.fremX < 5) Pemain.fremX++
                else Pemain.fremX = 0;
            }
        }
        lariKeBawah(){
            konteks.drawImage(gambarPemain,Pemain.fremX*Pemain.lebar,Pemain.fremY*Pemain.tinggi,Pemain.lebar,Pemain.tinggi,this.posisi.x-5,this.posisi.y-7.5,10,10);
            Pemain.fremY = 3;
            if(Pemain.frem % Pemain.tingkatFrem == 0){
                if(Pemain.fremX < 5) Pemain.fremX++
                else Pemain.fremX = 0;
            }
        }
        lariKeKiri(){
            konteks.save();
            konteks.translate(this.posisi.x-19, this.posisi.y+16.8); 
            konteks.scale(-1, 1);
            konteks.drawImage(gambarPemain,Pemain.fremX*Pemain.lebar,Pemain.fremY*Pemain.tinggi,Pemain.lebar,Pemain.tinggi,-Pemain.lebar/2,-Pemain.tinggi/2,10,10);
            konteks.restore();
            Pemain.fremY = 4;
            if(Pemain.frem % Pemain.tingkatFrem == 0){
                if(Pemain.fremX < 5) Pemain.fremX++
                else Pemain.fremX = 0;
            }
        }
        lariKeKanan(){
            konteks.drawImage(gambarPemain,Pemain.fremX*Pemain.lebar,Pemain.fremY*Pemain.tinggi,Pemain.lebar,Pemain.tinggi,this.posisi.x-5,this.posisi.y-7.5,10,10);
            Pemain.fremY = 4;
            if(Pemain.frem % Pemain.tingkatFrem == 0){
                if(Pemain.fremX < 5) Pemain.fremX++
                else Pemain.fremX = 0;
            }
        }
        meninggoy(){

        }
        serang(cekArah){
            switch(cekArah){
                case "atas":
                    konteks.drawImage(gambarPemain,Pemain.fremX*Pemain.lebar,Pemain.fremY*Pemain.tinggi,Pemain.lebar,Pemain.tinggi,this.posisi.x-5,this.posisi.y-7.5,10,10);
                    Pemain.fremY = 8;
                    if(Pemain.frem % Pemain.tingkatFrem == 1){
                        if(Pemain.fremX < 3)Pemain.fremX++
                        else Pemain.fremX = 0;
                    }
                    break;
                case "bawah":
                    konteks.drawImage(gambarPemain,Pemain.fremX*Pemain.lebar,Pemain.fremY*Pemain.tinggi,Pemain.lebar,Pemain.tinggi,this.posisi.x-5,this.posisi.y-7.5,10,10);
                    Pemain.fremY = 6;
                    if(Pemain.frem % Pemain.tingkatFrem == 1){
                        if(Pemain.fremX < 3)Pemain.fremX++
                        else Pemain.fremX = 0;
                    }
                    break;
                case "kiri":
                    konteks.save();
                    konteks.translate(this.posisi.x-19, this.posisi.y+16.8); 
                    konteks.scale(-1, 1);
                    konteks.drawImage(gambarPemain,Pemain.fremX*Pemain.lebar,Pemain.fremY*Pemain.tinggi,Pemain.lebar,Pemain.tinggi,-Pemain.lebar/2,-Pemain.tinggi/2,10,10);
                    konteks.restore();
                    Pemain.fremY = 7;
                    if(Pemain.frem % Pemain.tingkatFrem == 1){
                        if(Pemain.fremX < 3)Pemain.fremX++
                        else Pemain.fremX = 0;
                    }
                    break;
                case "kanan":
                    konteks.drawImage(gambarPemain,Pemain.fremX*Pemain.lebar,Pemain.fremY*Pemain.tinggi,Pemain.lebar,Pemain.tinggi,this.posisi.x-5,this.posisi.y-7.5,10,10);
                    Pemain.fremY = 7;
                    if(Pemain.frem % Pemain.tingkatFrem == 1){
                        if(Pemain.fremX < 3)Pemain.fremX++
                        else Pemain.fremX = 0;
                    }
                    break;
            }
        }
        aksi(){
            this.buatBentuk();
            if(this.aktifitas.diamAtas){
                if(this.aktifitas.serang) this.serang("atas")
                else this.diamAtas();
            }else if(this.aktifitas.diamBawah){
                if(this.aktifitas.serang) this.serang("bawah")
                else this.diamBawah();
            }else if(this.aktifitas.diamKanan){
                if(this.aktifitas.serang) this.serang("kanan")
                else this.diamKanan();
            }else if(this.aktifitas.diamKiri){
                if(this.aktifitas.serang) this.serang("kiri")
                else this.diamKiri();
            }else if(this.aktifitas.lariKeAtas){
                if(this.aktifitas.serang) this.serang("atas")
                else this.lariKeAtas();
            }else if(this.aktifitas.lariKeBawah){
                if(this.aktifitas.serang) this.serang("bawah")
                else this.lariKeBawah();
            }else if(this.aktifitas.lariKeKanan){
                if(this.aktifitas.serang) this.serang("kanan")
                else this.lariKeKanan();
            }else if(this.aktifitas.lariKeKiri){
                if(this.aktifitas.serang) this.serang("kiri")
                else this.lariKeKiri();
            }else{
                //  Pemain.fremX = Pemain.lebar * Math.floor(Pemain.frem/Pemain.tingkatFrem)%10;
                if(Pemain.freme % Pemain.tingkatFrem == 0){
                    if(Pemain.fremX < 5) Pemain.fremX++
                    else Pemain.fremX = 0;
                }
            }
            this.posisi.x+=this.perpindahan.x;
            this.posisi.y+=this.perpindahan.y;
            Pemain.frem++;
        }

    }

    class airSungai{
        static ukuran = 5;
        static lebartSprit = 640;
        static tinggiSprit = 576;
        static ukuranSprit = 16;
        constructor({posisi}){
            this.posisi=posisi;
            this.perpindahan=0;
            this.frem=5;
            this.fremX=0;
            // this.maxFrem=
        }
        buatBentuk(){
            konteks.fillStyle="#40513B";
            konteks.fillRect(this.posisi.x,this.posisi.y,airSungai.ukuran,airSungai.ukuran);
            konteks.drawImage(duniaLuar,this.fremX*airSungai.ukuranSprit,2*airSungai.ukuranSprit,airSungai.ukuranSprit,airSungai.ukuranSprit,this.posisi.x,this.posisi.y,pasir.ukuran,pasir.ukuran);
        }
        animasi(){
            this.buatBentuk();
            if(this.perpindahan % this.frem == 0){
                if(this.fremX < 3)this.fremX++
                else this.fremX = 0;
            }
            this.perpindahan ++;
        }
    }
    class pasir {
        static ukuran= 5;
        constructor({posisi}){
            this.posisi=posisi;
        }
        buatBentuk(){
            konteks.fillStyle="#40513B";
            konteks.fillRect(this.posisi.x,this.posisi.y,pasir.ukuran,tembokKiri.ukuran);
            konteks.drawImage(duniaLuar,1*16,4*16,16,16,this.posisi.x,this.posisi.y,pasir.ukuran,pasir.ukuran);
        }
    }

    class tembokKiri {
        static ukuranTembok = 5;
        constructor({posisi}){
            this.posisi=posisi;
        }
        buatBentuk(){
            konteks.fillStyle="#40513B";
            konteks.fillRect(this.posisi.x,this.posisi.y,tembokKiri.ukuranTembok,tembokKiri.ukuranTembok);
            konteks.drawImage(duniaLuar,0,4*16,16,16,this.posisi.x,this.posisi.y,tembokKiri.ukuranTembok,tembokKiri.ukuranTembok);
        }
    }

    class tembokKanan {
        static ukuranTembok = 5;
        constructor({posisi}){
            this.posisi=posisi;
        }
        buatBentuk(){
            konteks.fillStyle="#40513B";
            konteks.fillRect(this.posisi.x,this.posisi.y,tembokKanan.ukuranTembok,tembokKanan.ukuranTembok);
            konteks.drawImage(duniaLuar,2*16,4*16,16,16,this.posisi.x,this.posisi.y,tembokKanan.ukuranTembok,tembokKanan.ukuranTembok);
        }
    }

    class sudutTembokKiri {
        static ukuranTembok = 5;
        constructor({posisi}){
            this.posisi=posisi;
        }
        buatBentuk(){
            konteks.fillStyle="#40513B";
            konteks.fillRect(this.posisi.x,this.posisi.y,sudutTembokKiri.ukuranTembok,sudutTembokKiri.ukuranTembok);
            konteks.drawImage(duniaLuar,0,3*16,16,16,this.posisi.x,this.posisi.y,sudutTembokKiri.ukuranTembok,sudutTembokKiri.ukuranTembok);
        }
    }

    class sudutTembokKananAtas {
        static ukuranTembok = 5;
        constructor({posisi}){
            this.posisi=posisi;
        }
        buatBentuk(){
            konteks.fillStyle="#40513B";
            konteks.fillRect(this.posisi.x,this.posisi.y,sudutTembokKananAtas.ukuranTembok,sudutTembokKananAtas.ukuranTembok);
            konteks.drawImage(duniaLuar,2*16,3*16,16,16,this.posisi.x,this.posisi.y,sudutTembokKananAtas.ukuranTembok,sudutTembokKananAtas.ukuranTembok);
        }
    }

    class sudutTembokKananBawah {
        static ukuranTembok = 5;
        constructor({posisi}){
            this.posisi=posisi;
        }
        buatBentuk(){
            konteks.fillStyle="#40513B";
            konteks.fillRect(this.posisi.x,this.posisi.y,sudutTembokKananBawah.ukuranTembok,sudutTembokKananBawah.ukuranTembok);
            konteks.drawImage(duniaLuar,2*16,5*16,16,16,this.posisi.x,this.posisi.y,sudutTembokKananBawah.ukuranTembok,sudutTembokKananBawah.ukuranTembok);
        }
    }

    class sudutTembokBawah {
        static ukuranTembok = 5;
        constructor({posisi}){
            this.posisi=posisi;
        }
        buatBentuk(){
            konteks.fillStyle="#40513B";
            konteks.fillRect(this.posisi.x,this.posisi.y,sudutTembokBawah.ukuranTembok,sudutTembokBawah.ukuranTembok);
            konteks.drawImage(duniaLuar,0,5*16,16,16,this.posisi.x,this.posisi.y,sudutTembokBawah.ukuranTembok,sudutTembokBawah.ukuranTembok);
        }
    }

    class tembokAtas {
        static ukuranTembok = 5;
        constructor({posisi}){
            this.posisi=posisi;
        }
        buatBentuk(){
            konteks.fillStyle="#40513B";
            konteks.fillRect(this.posisi.x,this.posisi.y,tembokAtas.ukuranTembok,tembokAtas.ukuranTembok);
            konteks.drawImage(duniaLuar,1*16,3*16,16,16,this.posisi.x,this.posisi.y,tembokAtas.ukuranTembok,tembokAtas.ukuranTembok);
        }
    }

    class tembokBawah {
        static ukuranTembok = 5;
        constructor({posisi}){
            this.posisi=posisi;
        }
        buatBentuk(){
            konteks.fillStyle="#40513B";
            konteks.fillRect(this.posisi.x,this.posisi.y,tembokBawah.ukuranTembok,tembokBawah.ukuranTembok);
            konteks.drawImage(duniaLuar,1*16,5*16,16,16,this.posisi.x,this.posisi.y,tembokBawah.ukuranTembok,tembokBawah.ukuranTembok);
        }
    }

    class partikel {
        static ukuranPartikel = 5;
        constructor({posisi}){
            this.posisi=posisi;
        }
        buatBentuk(){
            konteks.fillStyle="#BA704F";
            konteks.fillRect(this.posisi.x,this.posisi.y,partikel.ukuranPartikel,partikel.ukuranPartikel);
            konteks.drawImage(duniaLuar,0,0,16,16,this.posisi.x,this.posisi.y,partikel.ukuranPartikel,partikel.ukuranPartikel);
        }
    }
    
    class karakterNpc {
        static ukuran =5;
        static kecepatan = 0.5;
        static lebartSprit = 64;
        static tinggiSprit = 129;
        constructor({posisi,perpindahan}){
            this.posisi=posisi;
            this.perpindahan=perpindahan;
            this.ukuran = 1;
            this.frem = 0;
            this.fremX = 0;
            this.fremY = 0;
            this.tingkatFrem = 5;
            this.aktifitas = {
                atas:false,
                bawah:true,
            }

        }
        buatBentuk(){
            konteks.beginPath();
            // konteks.fillStyle="rgba(0,0,0,0.0)";
            konteks.fillStyle="red";
            konteks.arc(this.posisi.x,this.posisi.y,this.ukuran,0,Math.PI*2);
            konteks.fill();
            konteks.closePath();
        }
        perilakuAtasBawah(){
            this.buatBentuk();
            this.animasi();
            if(this.posisi.y>70){
                this.aktifitas.bawah=false;
                this.aktifitas.atas=true;
                this.perpindahan.y=-karakterNpc.kecepatan;
            } 
            if(this.posisi.y<50){
                this.aktifitas.bawah=true;
                this.aktifitas.atas=false;
                this.perpindahan.y=karakterNpc.kecepatan;
            }
            
            this.posisi.y+=this.perpindahan.y;
            this.frem++;
        }
        interaksi(){

        }
        animasi(){
            if(this.aktifitas.bawah){
                konteks.drawImage(gambarnpc,this.fremX*(karakterNpc.lebartSprit/4),this.fremY*(karakterNpc.tinggiSprit/4),karakterNpc.lebartSprit/4,karakterNpc.tinggiSprit/4,this.posisi.x-(karakterNpc.ukuran/2),this.posisi.y-(karakterNpc.ukuran/2),karakterNpc.ukuran,karakterNpc.ukuran);
                this.fremY=0;
                if(this.frem % this.tingkatFrem == 0){
                    if(this.fremX < 3) this.fremX++
                    else this.fremX = 0;
                }
            }else if(this.aktifitas.atas){
                konteks.drawImage(gambarnpc,this.fremX*(karakterNpc.lebartSprit/4),this.fremY*(karakterNpc.tinggiSprit/4),karakterNpc.lebartSprit/4,karakterNpc.tinggiSprit/4,this.posisi.x-(karakterNpc.ukuran/2),this.posisi.y-(karakterNpc.ukuran/2),karakterNpc.ukuran,karakterNpc.ukuran);
                this.fremY=2;
                if(this.frem % this.tingkatFrem == 0){
                    if(this.fremX < 3) this.fremX++
                    else this.fremX = 0;
                }
            }
        }
    }

    petaDunia.forEach((baris,i)=>{
        baris.forEach((tipePartikel,j)=>{
        // console.log('ini adalah j :',j);
        switch(tipePartikel){
            case 0:
                kumpulanPartikel.push(new partikel({posisi:{x:(partikel.ukuranPartikel*j),y:(partikel.ukuranPartikel*i)}}));
                break;
            case 1:
                kumpulanTembokKiri.push(new tembokKiri({posisi:{x:tembokKiri.ukuranTembok*j,y:tembokKiri.ukuranTembok*i}}));
                break;
            case 3:
                kumpulanPohon.push(new Pohon({posisi:{x:Pohon.ukuran*j,y:Pohon.ukuran*i}}));
                break;
            case 5:
                kumpulanTembokBawah.push(new tembokBawah({posisi:{x:tembokBawah.ukuranTembok*j,y:tembokBawah.ukuranTembok*i}}));
                break;
            case 4:
                kumpulanRumah.push(new Rumah({posisi:{x:Rumah.ukuran*j,y:Rumah.ukuran*i}}));
                break;
            case 7:
                kumpulanTembokAtas.push(new tembokAtas({posisi:{x:tembokAtas.ukuranTembok*j,y:tembokAtas.ukuranTembok*i}}));
                break;
            case 8:
                kumpulanSudutTembokKananBawah.push(new sudutTembokKananBawah({posisi:{x:sudutTembokKananBawah.ukuranTembok*j,y:sudutTembokKananBawah.ukuranTembok*i}}));
                break;
            case 9:
                kumpulanSudutTembokKiri.push(new sudutTembokKiri({posisi:{x:sudutTembokKiri.ukuranTembok*j,y:sudutTembokKiri.ukuranTembok*i}}));
                break;
            case 6:
                kumpulanSudutTembokBawah.push(new sudutTembokBawah({posisi:{x:sudutTembokBawah.ukuranTembok*j,y:sudutTembokBawah.ukuranTembok*i}}));
                break;
            case 11:
                kumpulanTembokKanan.push(new tembokKanan({posisi:{x:tembokKanan.ukuranTembok*j,y:tembokKanan.ukuranTembok*i}}));
                break;
            case 12:
                kumpulanPasir.push(new pasir({posisi:{x:pasir.ukuran*j,y:pasir.ukuran*i}}));
                break;
            case 13:
                kumpulanAirSungai.push(new airSungai({posisi:{x:pasir.ukuran*j,y:pasir.ukuran*i}}));
                break;
            case 14:
                kumpulanSemakKecilX.push(new SemakKecilX({posisi:{x:SemakKecilX.ukuran*j,y:SemakKecilX.ukuran*i}}));
                break;
            case 15:
                kumpulanSemakKecilY.push(new SemakKecilY({posisi:{x:SemakKecilY.ukuran*j,y:SemakKecilX.ukuran*i}}));
                break;
            case 19:
                kumpulanSudutTembokKananAtas.push(new sudutTembokKananAtas({posisi:{x:sudutTembokKananAtas.ukuranTembok*j,y:sudutTembokKananAtas.ukuranTembok*i}}));
                break;

        }
        })
    });

    const pemain = new Pemain({posisi:{x:(partikel.ukuranPartikel+partikel.ukuranPartikel/2)*4,y:(partikel.ukuranPartikel+partikel.ukuranPartikel/2)*3.5},perpindahan:{x:0,y:0}});
    const npc = new karakterNpc({posisi:{x:100,y:50},perpindahan:{x:0,y:1}});
    const duniaGim = () => {
        // konteks.fillStyle="#BA704F";
        konteks.clearRect(0,0,lebarLayar,tinggiLayar);
        konteks.font='2px courier';
        // konteks.save();
        kameraX = pemain.posisi.x - lebarLayar / (2*skalaKamere);
        kameraY = pemain.posisi.y - tinggiLayar / (2*skalaKamere);
        kameraX = Math.max(0, Math.min(kameraX, petaDunia[0].length * partikel.ukuranPartikel - lebarLayar / skalaKamere)-4);
        kameraY = Math.max(0, Math.min(kameraY, petaDunia.length * partikel.ukuranPartikel - tinggiLayar / skalaKamere)-3.5);
        konteks.setTransform(skalaKamere, 0, 0, skalaKamere, -kameraX * skalaKamere, -kameraY * skalaKamere);
        kumpulanPartikel.forEach((serpihan)=>{
            serpihan.buatBentuk();
            /*
                jika posisi y pamain di kurang ukuran pemain
                di tambah perpindahan y  pemain kurang dari samadengan posisi y pada
                kumpulan partikel di tambah ukuran partikel 
                
                dan 

                jika posisi x pamain di tambah ukuran pemain
                di tambah perpindahan x  pemain lebih dari samadengan posisi y pada
                kumpulan partikel di tambah ukuran partikel 

                dan

                jika 
            */
            // if( (pemain.posisi.y - pemain.ukuran) + pemain.perpindahan.y <= serpihan.posisi.y + partikel.ukuranPartikel &&
            //     (pemain.posisi.x + pemain.ukuran) + pemain.perpindahan.x >= serpihan.posisi.x &&
            //     (pemain.posisi.y + pemain.ukuran) + pemain.perpindahan.y >= serpihan.posisi.y && 
            //     (pemain.posisi.x - pemain.ukuran) + pemain.perpindahan.x <= serpihan.posisi.x + partikel.ukuranPartikel
            // ){
            //     pemain.perpindahan.y=0;
            //     pemain.perpindahan.x=0;
            // }
        });
        kumpulanSemakKecilY.forEach((serpihan)=>{
            serpihan.buatBentuk();
            if( (pemain.posisi.y - pemain.ukuran) + pemain.perpindahan.y <= serpihan.posisi.y + Rumah.ukuran &&
                (pemain.posisi.x + pemain.ukuran) + pemain.perpindahan.x >= serpihan.posisi.x &&
                (pemain.posisi.y + pemain.ukuran) + pemain.perpindahan.y >= serpihan.posisi.y && 
                (pemain.posisi.x - pemain.ukuran) + pemain.perpindahan.x <= serpihan.posisi.x + Rumah.ukuran
            ){
                pemain.perpindahan.y=0;
                pemain.perpindahan.x=0;
            }
        });
        kumpulanSemakKecilX.forEach((serpihan)=>{
            serpihan.buatBentuk();
            if( (pemain.posisi.y - pemain.ukuran) + pemain.perpindahan.y <= serpihan.posisi.y + Rumah.ukuran &&
                (pemain.posisi.x + pemain.ukuran) + pemain.perpindahan.x >= serpihan.posisi.x &&
                (pemain.posisi.y + pemain.ukuran) + pemain.perpindahan.y >= serpihan.posisi.y && 
                (pemain.posisi.x - pemain.ukuran) + pemain.perpindahan.x <= serpihan.posisi.x + Rumah.ukuran
            ){
                pemain.perpindahan.y=0;
                pemain.perpindahan.x=0;
            }
        });
        kumpulanRumah.forEach((serpihan)=>{
            serpihan.buatBentuk();
            if( (pemain.posisi.y - pemain.ukuran) + pemain.perpindahan.y <= serpihan.posisi.y + Rumah.ukuran &&
                (pemain.posisi.x + pemain.ukuran) + pemain.perpindahan.x >= serpihan.posisi.x &&
                (pemain.posisi.y + pemain.ukuran) + pemain.perpindahan.y >= serpihan.posisi.y && 
                (pemain.posisi.x - pemain.ukuran) + pemain.perpindahan.x <= serpihan.posisi.x + Rumah.ukuran
            ){
                pemain.perpindahan.y=0;
                pemain.perpindahan.x=0;
            }
        });
        kumpulanAirSungai.forEach((serpihan)=>{
            serpihan.animasi();
            if( (pemain.posisi.y - pemain.ukuran) + pemain.perpindahan.y <= serpihan.posisi.y + Pohon.ukuran &&
                (pemain.posisi.x + pemain.ukuran) + pemain.perpindahan.x >= serpihan.posisi.x &&
                (pemain.posisi.y + pemain.ukuran) + pemain.perpindahan.y >= serpihan.posisi.y && 
                (pemain.posisi.x - pemain.ukuran) + pemain.perpindahan.x <= serpihan.posisi.x + Pohon.ukuran
            ){
                pemain.perpindahan.y=0;
                pemain.perpindahan.x=0;
            }
        });
        kumpulanPasir.forEach((serpihan)=>{
            serpihan.buatBentuk();
            if( (pemain.posisi.y - pemain.ukuran) + pemain.perpindahan.y <= serpihan.posisi.y + Pohon.ukuran &&
                (pemain.posisi.x + pemain.ukuran) + pemain.perpindahan.x >= serpihan.posisi.x &&
                (pemain.posisi.y + pemain.ukuran) + pemain.perpindahan.y >= serpihan.posisi.y && 
                (pemain.posisi.x - pemain.ukuran) + pemain.perpindahan.x <= serpihan.posisi.x + Pohon.ukuran
            ){
                pemain.perpindahan.y=0;
                pemain.perpindahan.x=0;
            }
        });
        kumpulanPohon.forEach((serpihan)=>{
            serpihan.buatBentuk();
            if( (pemain.posisi.y - pemain.ukuran) + pemain.perpindahan.y <= serpihan.posisi.y + Pohon.ukuran &&
                (pemain.posisi.x + pemain.ukuran) + pemain.perpindahan.x >= serpihan.posisi.x &&
                (pemain.posisi.y + pemain.ukuran) + pemain.perpindahan.y >= serpihan.posisi.y && 
                (pemain.posisi.x - pemain.ukuran) + pemain.perpindahan.x <= serpihan.posisi.x + Pohon.ukuran
            ){
                pemain.perpindahan.y=0;
                pemain.perpindahan.x=0;
            }
        });
        kumpulanTembokAtas.forEach((serpihan)=>{
            serpihan.buatBentuk();
            if( (pemain.posisi.y - pemain.ukuran) + pemain.perpindahan.y <= serpihan.posisi.y + partikel.ukuranPartikel &&
                (pemain.posisi.x + pemain.ukuran) + pemain.perpindahan.x >= serpihan.posisi.x &&
                (pemain.posisi.y + pemain.ukuran) + pemain.perpindahan.y >= serpihan.posisi.y && 
                (pemain.posisi.x - pemain.ukuran) + pemain.perpindahan.x <= serpihan.posisi.x + partikel.ukuranPartikel
            ){
                pemain.perpindahan.y=0;
                pemain.perpindahan.x=0;
            }
        });
        kumpulanTembokBawah.forEach((serpihan)=>{
            serpihan.buatBentuk();
            if( (pemain.posisi.y - pemain.ukuran) + pemain.perpindahan.y <= serpihan.posisi.y + partikel.ukuranPartikel &&
                (pemain.posisi.x + pemain.ukuran) + pemain.perpindahan.x >= serpihan.posisi.x &&
                (pemain.posisi.y + pemain.ukuran) + pemain.perpindahan.y >= serpihan.posisi.y && 
                (pemain.posisi.x - pemain.ukuran) + pemain.perpindahan.x <= serpihan.posisi.x + partikel.ukuranPartikel
            ){
                pemain.perpindahan.y=0;
                pemain.perpindahan.x=0;
            }
        });
        kumpulanSudutTembokBawah.forEach((serpihan)=>{
            serpihan.buatBentuk();
            if( (pemain.posisi.y - pemain.ukuran) + pemain.perpindahan.y <= serpihan.posisi.y + partikel.ukuranPartikel &&
                (pemain.posisi.x + pemain.ukuran) + pemain.perpindahan.x >= serpihan.posisi.x &&
                (pemain.posisi.y + pemain.ukuran) + pemain.perpindahan.y >= serpihan.posisi.y && 
                (pemain.posisi.x - pemain.ukuran) + pemain.perpindahan.x <= serpihan.posisi.x + partikel.ukuranPartikel
            ){
                pemain.perpindahan.y=0;
                pemain.perpindahan.x=0;
            }
        })
        kumpulanSudutTembokKiri.forEach((serpihan)=>{
            serpihan.buatBentuk();
            if( (pemain.posisi.y - pemain.ukuran) + pemain.perpindahan.y <= serpihan.posisi.y + partikel.ukuranPartikel &&
                (pemain.posisi.x + pemain.ukuran) + pemain.perpindahan.x >= serpihan.posisi.x &&
                (pemain.posisi.y + pemain.ukuran) + pemain.perpindahan.y >= serpihan.posisi.y && 
                (pemain.posisi.x - pemain.ukuran) + pemain.perpindahan.x <= serpihan.posisi.x + partikel.ukuranPartikel
            ){
                pemain.perpindahan.y=0;
                pemain.perpindahan.x=0;
            }
        });
        kumpulanTembokKanan.forEach((serpihan)=>{
            serpihan.buatBentuk();
            if( (pemain.posisi.y - pemain.ukuran) + pemain.perpindahan.y <= serpihan.posisi.y + partikel.ukuranPartikel &&
                (pemain.posisi.x + pemain.ukuran) + pemain.perpindahan.x >= serpihan.posisi.x &&
                (pemain.posisi.y + pemain.ukuran) + pemain.perpindahan.y >= serpihan.posisi.y && 
                (pemain.posisi.x - pemain.ukuran) + pemain.perpindahan.x <= serpihan.posisi.x + partikel.ukuranPartikel
            ){
                pemain.perpindahan.y=0;
                pemain.perpindahan.x=0;
            }
        });
        // console.log(kumpulanSudutTembokKananAtas);
        kumpulanSudutTembokKananBawah.forEach((serpihan)=>{
            serpihan.buatBentuk();
            // console,log(serpihan.buatBentuk());
            if( (pemain.posisi.y - pemain.ukuran) + pemain.perpindahan.y <= serpihan.posisi.y + partikel.ukuranPartikel &&
                (pemain.posisi.x + pemain.ukuran) + pemain.perpindahan.x >= serpihan.posisi.x &&
                (pemain.posisi.y + pemain.ukuran) + pemain.perpindahan.y >= serpihan.posisi.y && 
                (pemain.posisi.x - pemain.ukuran) + pemain.perpindahan.x <= serpihan.posisi.x + partikel.ukuranPartikel
            ){
                pemain.perpindahan.y=0;
                pemain.perpindahan.x=0;
            }
            // console.log("sudut kanan atas aktif ");
        });
        kumpulanSudutTembokKananAtas.forEach((serpihan)=>{
            serpihan.buatBentuk();
            // console,log(serpihan.buatBentuk());
            if( (pemain.posisi.y - pemain.ukuran) + pemain.perpindahan.y <= serpihan.posisi.y + partikel.ukuranPartikel &&
                (pemain.posisi.x + pemain.ukuran) + pemain.perpindahan.x >= serpihan.posisi.x &&
                (pemain.posisi.y + pemain.ukuran) + pemain.perpindahan.y >= serpihan.posisi.y && 
                (pemain.posisi.x - pemain.ukuran) + pemain.perpindahan.x <= serpihan.posisi.x + partikel.ukuranPartikel
            ){
                pemain.perpindahan.y=0;
                pemain.perpindahan.x=0;
            }
            // console.log("sudut kanan atas aktif ");
        });
        kumpulanTembokKiri.forEach((serpihan)=>{
            serpihan.buatBentuk();
            if( (pemain.posisi.y - pemain.ukuran) + pemain.perpindahan.y <= serpihan.posisi.y + partikel.ukuranPartikel &&
                (pemain.posisi.x + pemain.ukuran) + pemain.perpindahan.x >= serpihan.posisi.x &&
                (pemain.posisi.y + pemain.ukuran) + pemain.perpindahan.y >= serpihan.posisi.y && 
                (pemain.posisi.x - pemain.ukuran) + pemain.perpindahan.x <= serpihan.posisi.x + partikel.ukuranPartikel
            ){
                pemain.perpindahan.y=0;
                pemain.perpindahan.x=0;
            }
        });
        // npc.aksi();
        npc.perilakuAtasBawah();
        pemain.aksi();
        
        // new PetaKecil(pemain.posisi.x+lebarLayar,pemain.posisi.y).gambarPeta();
        konteks.setTransform(1, 0, 0, 1, 0, 0);
        // konteks.restore();
        window.requestAnimationFrame(duniaGim);
    }



    console.log("game is started !");
    duniaGim();
    window.addEventListener("keydown",(e)=>{
         console.log(e.key.charAt());
        //  console.group("kontrol")
        switch(e.key.charAt()){
            case "w":
                pemain.aktifitas.diamBawah=false;
                pemain.aktifitas.diamKiri=false;
                pemain.aktifitas.diamKanan=false;

                pemain.aktifitas.diamAtas=true;
                Pemain.kecepatan=kecepatanBerjalan;
                pemain.perpindahan.y=-Pemain.kecepatan;
                // console.log("atas");
                break;
            case "a":
                pemain.aktifitas.diamAtas=false;
                pemain.aktifitas.diamBawah=false;
                pemain.aktifitas.diamKanan=false;

                pemain.aktifitas.diamKiri=true;
                Pemain.kecepatan=kecepatanBerjalan;
                pemain.perpindahan.x=-Pemain.kecepatan;
                // console.log("kiri");
                break;
            case "s":
                pemain.aktifitas.diamAtas=false;
                pemain.aktifitas.diamKiri=false;
                pemain.aktifitas.diamKanan=false;

                pemain.aktifitas.diamBawah=true;
                Pemain.kecepatan=kecepatanBerjalan;
                pemain.perpindahan.y=Pemain.kecepatan;
                // console.log("bawah");
                break;
            case "d":
                pemain.aktifitas.diamAtas=false;
                pemain.aktifitas.diamBawah=false;
                pemain.aktifitas.diamKiri=false;

                pemain.aktifitas.diamKanan=true;
                Pemain.kecepatan=kecepatanBerjalan;
                pemain.perpindahan.x=Pemain.kecepatan;
                // console.log("kanan");
                break;
            case "k":
                pemain.aktifitas.diamBawah=false;
                pemain.aktifitas.diamKiri=false;
                pemain.aktifitas.diamKanan=false;
                pemain.aktifitas.diamAtas=false;
                pemain.aktifitas.lariKeBawah=false;
                pemain.aktifitas.lariKeKiri=false;
                pemain.aktifitas.lariKeKanan=false;

                pemain.aktifitas.lariKeBawah=false;
                pemain.aktifitas.lariKeAtas=true;
                // console.log("lari ke atas")
                Pemain.kecepatan=kecepatanBerlari;
                pemain.perpindahan.y=-Pemain.kecepatan;
                break;
            case "j":
                pemain.aktifitas.diamBawah=false;
                pemain.aktifitas.diamKiri=false;
                pemain.aktifitas.diamKanan=false;
                pemain.aktifitas.diamAtas=false;
                pemain.aktifitas.lariKeBawah=false;
                pemain.aktifitas.lariKeKiri=false;
                pemain.aktifitas.lariKeKanan=false;


                pemain.aktifitas.lariKeAtas=false;
                pemain.aktifitas.lariKeBawah=true;
                // console.log("lari ke bawah")
                Pemain.kecepatan=kecepatanBerlari;
                pemain.perpindahan.y=Pemain.kecepatan;
                break;
            case "h":
                pemain.aktifitas.diamBawah=false;
                pemain.aktifitas.diamKiri=false;
                pemain.aktifitas.diamKanan=false;
                pemain.aktifitas.diamAtas=false;

                pemain.aktifitas.lariKeBawah=false;
                pemain.aktifitas.lariKeKiri=true;
                pemain.aktifitas.lariKeKanan=false;
                pemain.aktifitas.lariKeAtas=false;
                pemain.aktifitas.lariKeBawah=false;
                // console.log("lari ke kiri")
                Pemain.kecepatan=kecepatanBerlari;
                pemain.perpindahan.x=-Pemain.kecepatan;
                break;
            case "l":
                pemain.aktifitas.diamBawah=false;
                pemain.aktifitas.diamKiri=false;
                pemain.aktifitas.diamKanan=false;
                pemain.aktifitas.diamAtas=false;

                pemain.aktifitas.lariKeBawah=false;
                pemain.aktifitas.lariKeKiri=false;
                pemain.aktifitas.lariKeKanan=true;
                pemain.aktifitas.lariKeAtas=false;
                pemain.aktifitas.lariKeBawah=false;
                // console.log("lari ke kanan")
                Pemain.kecepatan=kecepatanBerlari;
                pemain.perpindahan.x=Pemain.kecepatan;
                break;
            case "E":
                console.log("serang");
                pemain.aktifitas.serang=true;
                break;
            case " ":
                break;
        }
    });
    window.addEventListener("keyup",(e)=>{
        //console.log(e.key.charAt());
        switch(e.key.charAt()){
            case "w":
                pemain.perpindahan.y=0;
                // console.log("atas");
                break;
            case "a":
                pemain.perpindahan.x=0;
                // console.log("kiri");
                break;
            case "s":
                pemain.perpindahan.y=0;
                // console.log("bawah");
                break;
            case "d":
                pemain.perpindahan.x=0;
                // console.log("kanan");
                break;
            case "k":
                pemain.aktifitas.lariKeAtas=false;
                pemain.aktifitas.lariKeBawah=false;

                pemain.aktifitas.diamAtas=true;
                pemain.aktifitas.diamBawah=false;
                pemain.perpindahan.y=0;
                break;
            case "j":
                pemain.aktifitas.lariKeBawah=false;
                pemain.aktifitas.lariKeAtas=false;
                pemain.aktifitas.lariKeKiri=false;
                pemain.aktifitas.diamKanan=false;
                pemain.aktifitas.diamKanan=false;
                pemain.aktifitas.diamKiri=false;
                pemain.aktifitas.diamAtas=false;
                pemain.aktifitas.diamBawah=true;
                pemain.perpindahan.y=0;
                break;
            case "h":
                pemain.aktifitas.lariKeAtas=false;
                pemain.aktifitas.lariKeBawah=false;
                pemain.aktifitas.diamBawah=false;
                pemain.aktifitas.diamAtas=false;
                pemain.aktifitas.lariKeKiri=false;
                pemain.aktifitas.diamKiri=true;
                pemain.perpindahan.x=0;
                break;
            case "l":
                pemain.aktifitas.lariKeAtas=false;
                pemain.aktifitas.lariKeBawah=false;
                pemain.aktifitas.lariKeKiri=false;
                pemain.aktifitas.lariKeKanan=false;
                pemain.aktifitas.diamBawah=false;
                pemain.aktifitas.diamAtas=false;
                pemain.aktifitas.diamKanan=true;
                pemain.aktifitas.diamKiri=false;
                pemain.perpindahan.x=0;
                break;
                case "E":
                    console.log("selesai menyerang");
                    pemain.aktifitas.serang=false;
                    break;
                case " ":
                    break;
        }
        // console.groupEnd();
    });

      
});

