const originX = window.innerWidth / 2;
const originY = window.innerHeight / 2;

export class Body{
      constructor(x, y, vx, vy, m, name, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.m = m;
        this.name = name;
        this.color = color;
        this.oldx = x;
        this.oldy = y;
      }

      drawCircle(scale, context) {
        let xpos = originX + this.x * scale;
        let ypos = originY + this.y * scale;
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(xpos, ypos, 10, 0, Math.PI * 2, false);
        context.fill();
      }

      drawSmallCircle(scale, context) {
        let xpos = originX + this.x * scale;
        let ypos = originY + this.y * scale;
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(xpos, ypos, 0.8, 0, Math.PI * 2, false);
        context.fill();
      }

      drawText(theme, scale, context, text) {
   
        let xpos = originX + this.x * scale;
        let ypos = originY + this.y * scale;
        if (theme === "light") {
          context.fillStyle = "black";
        } else {
          context.fillStyle = "#f7f5ef";
        }
        context.font = "11px system-ui";
        context.fillText(text, xpos + 10, ypos - 10);
      }
    }