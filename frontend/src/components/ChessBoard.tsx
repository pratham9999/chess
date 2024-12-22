/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export default function ChessBoard({ chess ,board , socket , setBoard} : {board : ({
     square : Square;
     type : PieceSymbol;
     color : Color;
} | null)[][]; 
  socket : WebSocket
  setBoard : any,
  chess : any,

}) {
    const [from , setFrom] = useState<null | Square>(null);
    const [to , setTo] = useState<null | Square>(null)
  return (

    <div className="text-white-200">
        {
            board.map((row , i)=>{
                    return <div key={i} className="flex">
                           {
                            row.map((square , j)=> {
                                const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" +(8-i) as Square ;
                                return <div onClick={()=>{
                                    if(!from){
                                           setFrom(squareRepresentation);
                                    }
                                    else{
                                        try {
                                            
                                            socket.send(JSON.stringify({
                                                type : MOVE,
                                                payload : {
                                                    move :{
                                                    from ,
                                                   to : squareRepresentation
                                                    }
                                                }
                                              }))

                                              setFrom(null);
                                              chess.move({
                                                from ,
                                                to : squareRepresentation
                                              });
                                              setBoard(chess.board);

                                              console.log({to , from});
                                              
                                            
                                        } catch (error) {
                                            console.log(error);
                                            
                                        }
                                    }
                                }} key={j} className={`w-16 h-16 ${(i+j)%2===0 ? 'bg-green-800' : 'bg-white'}`}>
                                       <div className="w-full justify-center flex h-full">
                                            <div className="h-full justify-center flex flex-col">
                                            {square ? square.type : ""}

                                            </div>
                                       </div>
                                </div> 
                            })
                           }
                    </div>
            })
        }
       
    </div>
  )
}
