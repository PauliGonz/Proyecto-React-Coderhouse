import { useEffect, useRef, useState } from "react";

/**
 * 
 * @returns Realicé como extra una cuenta regresiva para simular, la reserva del stock, al momento de solicitar un producto.
 */
export const CountDown = () => {
    const [seg, setSeg] = useState(1000);

    let reloadSeg = 60

    if(seg === 0){
        setSeg(reloadSeg)
            alert("Se agotó el tiempo de reserva. Favor actualiza la página para asegurar tu compra")
    }

    let intervalRef = useRef();

    const decreaseSeg = () => setSeg((prev) => prev - 1);

    
    useEffect(() => {
        intervalRef.current = setInterval(decreaseSeg, 1000) ;

        return () => clearInterval(intervalRef.current);
      }, []);

      return(
        <div id="CartCountdown" className="CartCountdown">     
            <span className="text-cart_coutdown prefix-cart_countdown">Su carrito está reservado por</span>
                <strong className="timer-cart_countdown">
                    <span className="seconds-cart_countdown"> {seg} segundos</span>
                </strong>
        </div>

    )

}