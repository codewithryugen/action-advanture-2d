'use strict';

// Utility 

/*
    + Collision detection / Deteksi tabrakan
*/

const DeteksiTabrakanObjekLingkaran = ({objek1,objek2})=>{
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance <= radius1 + radius2;
}

