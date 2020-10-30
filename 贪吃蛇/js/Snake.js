function Snake(imgs) {
    this.arr = [
        {row:5, col:6},
        {row:5, col:7},
        {row:5, col:8},
        {row:5, col:9},
        {row:5, col:10},
        {row:5, col:11},
    ];
    this.direction = 39;
    // 定义锁
    this.lock = true;
    this.headArr = imgs.snakeHead;
    this.headIndex = 2;
    this.body = imgs.snakeBody;
    this.tailArr = imgs.snakeTail;
    this.tailIndex = 0
}

// 改变方向
Snake.prototype.change = function(dir) {
    if (!this.lock == true) {
        return
    }
    this.lock = false
    if(Math.abs(dir - this.direction) === 2 || Math.abs(dir - this.direction) === 0){
        return
    }
    this.direction = dir; 
}

// 蛇移动
Snake.prototype.move = function() {
    this.lock = true
    // 
    // 必须一致点击才能传参过来，否则就一直向右走
    // 定义新蛇头
    let newHead = {row:this.arr[this.arr.length - 1].row, col: this.arr[this.arr.length - 1].col};
    if (this.direction == 37) {
        newHead.col--;
        this.headIndex = 0
    } else if (this.direction == 38) {
        newHead.row--;
        this.headIndex = 1
    } else if (this.direction == 39) {
        newHead.col++;
        this.headIndex = 2
    } else {
        newHead.row++
        this.headIndex = 3
    }
    this.arr.push(newHead);
    this.arr.shift();
    // 根据方向改变背景图片
    // 获取尾部
    let tail = this.arr[0];
    // 获取屁股
    let ass = this.arr[1];
    if (tail.row === ass.row) {
        this.tailIndex = tail.col > ass.col ? 2 : 0
    } else {
        this.tailIndex = tail.row > ass.row ? 3: 1
    }
}

// 蛇增长
Snake.prototype.grow = function() {
    this.arr.unshift(this.arr[0]);
}