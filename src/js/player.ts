import { Vector } from "./vector";
import { GameObject } from "./gameObject";
import { GameEngine } from "./index";

export class Player implements GameObject
{   
    public position:Vector 
    private gameEngine:GameEngine;
    public PlayerNumber: number;
    public static playMode = document.getElementById("playMode") as HTMLSelectElement;
    public speed:number = 160;
    public height:number = 30;
    public width:number = 10;
    

    constructor(position:Vector, gameEngine:GameEngine,playerNumber:number)
    {
        this.position = position;
        this.gameEngine = gameEngine;
        this.PlayerNumber = playerNumber;
    }

    update(time: number): void {
        if (this.PlayerNumber == 1)
        {
            if (this.gameEngine.aKey && this.position.y < this.gameEngine.canvasHeight-32)
            {
                //move down
                this.position.y += time/1000 * this.speed 
            }
            if (this.gameEngine.qKey && this.position.y > 1)
            {
                //move up
                this.position.y -= time/1000 * this.speed
            }
        }
        else
        {
            if (Player.playMode.value == "vsAi")
            {
                if (this.position.y < this.gameEngine.ball.position.y && this.position.y < this.gameEngine.canvasHeight-32)
                {
                    //move down
                    this.position.y += time/1000 * this.speed
                }
                if (this.position.y > this.gameEngine.ball.position.y && this.position.y > 1)
                {
                    //move up
                    this.position.y -= time/1000 * this.speed
                }
            }
            else if (Player.playMode.value == "vsPlayer")
            {
                if (this.gameEngine.lKey && this.position.y < this.gameEngine.canvasHeight-32)
                {
                    //move down
                    this.position.y += time/1000 * this.speed 
                }
                if (this.gameEngine.oKey && this.position.y > 4)
                {
                    //move up
                    this.position.y -= time/1000 * this.speed
                }
            }
            
            //this.position.y = this.gameEngine.ball.position.y-12; //Ai opponent with no-collision??
        }
       
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    onColliosion(other: GameObject): void {
        
        // not doing anything at the moment...
    }
}