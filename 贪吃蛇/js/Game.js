function Game(block, food, map, snake) {
    this.block = block;
    this.food = food;
    this.map = map;
    this.snake = snake;
    this.timer;
    this.init();
}
// 初始化
Game.prototype.init = function () {
    let that = this;
    // 渲染地图
    this.map.renderMap();
    this.renderSnake();
    this.renderFood();
    this.snakeMove()
    timer = setInterval(function () {
        // 清空地图
        that.clear();
        // 渲染蛇
        that.renderSnake();
        // 渲染障碍物
        that.renderBlock();
        // 渲染食物
        that.renderFood();
        // 蛇移动
        that.snake.move();
        // 蛇吃食物
        that.eatFood();
        // 判断边界
        that.judgeEdge();
        // 判断障碍物
        that.judgeBlock();
        // 判断自己
        that.judgeSelf();
    }, 100)

}
// 刷新(清空地图)
Game.prototype.clear = function () {
    for (let i = 0; i < this.map.rows; i++) {
        for (let j = 0; j < this.map.cols; j++) {
            this.map.arr[i][j].style.backgroundImage = ''
        }
    }
}
// 渲染食物
Game.prototype.renderFood = function () {
    this.map.arr[this.food.row][this.food.col].style.backgroundImage = 'url(' + this.food.img + ')';
}
// 渲染蛇
Game.prototype.renderSnake = function () {
    // 蛇头
    this.map.arr[this.snake.arr[this.snake.arr.length - 1].row][this.snake.arr[this.snake.arr.length - 1].col].style.backgroundImage = 'url(' + this.snake.headArr[this.snake.headIndex] + ')'
    // 蛇身
    for (let i = 1; i < this.snake.arr.length - 1; i++) {
        this.map.arr[this.snake.arr[i].row][this.snake.arr[i].col].style.backgroundImage = 'url(' + this.snake.body[0] + ')'
    }
    // 蛇尾
    this.map.arr[this.snake.arr[0].row][this.snake.arr[0].col].style.backgroundImage = 'url(' + this.snake.tailArr[this.snake.tailIndex] + ')'
}
// 渲染障碍物
Game.prototype.renderBlock = function() {
    for (let i = 0; i < this.block.arr.length; i++) {
        this.map.arr[this.block.arr[i].row][this.block.arr[i].col].style.backgroundImage='url(' + this.block.img + ')'
    }
}

// 控制蛇移动
Game.prototype.snakeMove = function() {
    // this.snake.move();
    let that = this;
    document.onkeydown = function(e) {
        console.log();
        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
            that.snake.change(e.keyCode);
        }
    }
}
// 游戏结束
Game.prototype.gameOver = function() {
    clearInterval(timer)
}
// 判断边界
Game.prototype.judgeEdge = function() {
    let headRow = this.snake.arr[this.snake.arr.length - 1].row;
    let headCol = this.snake.arr[this.snake.arr.length - 1].col;
    if (headRow >= this.map.rows || headRow < 0 || headCol >= this.map.cols || headCol < 0) {
        this.gameOver()
    }
}
// 判断障碍物
Game.prototype.judgeBlock = function() {
    let headRow = this.snake.arr[this.snake.arr.length - 1].row;
    let headCol = this.snake.arr[this.snake.arr.length - 1].col;
    for (let i = 0; i < this.block.arr.length; i++) {
        if (headRow === this.block.arr[i].row && headCol === this.block.arr[i].col) {
            this.gameOver()
        }
    }
}
// 判断吃自己
Game.prototype.judgeSelf = function() {
    let headRow = this.snake.arr[this.snake.arr.length - 1].row;
    let headCol = this.snake.arr[this.snake.arr.length - 1].col;
    for (let i = 0; i < this.snake.arr.length - 1; i++) {
        if (headRow === this.snake.arr[i].row && headCol === this.snake.arr[i].col) {
            this.gameOver()
        }
    }
}
// 蛇吃食物且增长
Game.prototype.eatFood = function() {
    let headRow = this.snake.arr[this.snake.arr.length - 1].row;
    let headCol = this.snake.arr[this.snake.arr.length - 1].col;
    if (headRow === this.food.row && headCol === this.food.col) {
        this.food.appearFood();
        this.snake.grow()
        // 不允许食物刷新在蛇身上或者障碍物上
        for (let i = 0; i < this.snake.arr.length; i++) {
            if (this.food.row === this.snake.arr[i].row || this.food.col === this.snake.arr[i].col) {
                this.eatFood();
                return
            }
        }
        for (let i = 0; i < this.block.arr.length; i++) {
            if (this.food.row === this.block.arr[i].row || this.food.col === this.block.arr[i].col) {
                this.eatFood()
                return
            }
        }
    }
}
