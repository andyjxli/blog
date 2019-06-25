function CPromise(executor) {
    const _self = this;

    // status 当前执行状态 0 - pending  1 - fulfilled 2 - rejected
    this.status = 0;
    // value 返回的信息
    this.value = null;
    // 事件队列数组
    this.deferreds = [];

    this.then = function(onResolved, onRejected) {
    
        return new CPromise((resolve, reject) => {
            handle({
                onResolved: onResolved || null,
                onRejected: onRejected || null,
                resolve: resolve,
                reject: reject
            })
        }) 
    }
    

    function resolve(value) {
        // 当状态已经发生改变
        if (_self.status !== 0) return;

        // 当前值不能是自己
        if (value === _self) {
            return reject(new TypeError('A promise cannot be resolve with itself.'));
        }

        console.log(value);

        if(value && typeof value.then === 'function') {
            value.then(resolve, reject);
            return;
        }

        // 当回调函数依然是promise时
        if (value instanceof CPromise && value.then === this.then) {
            const deferreds = _self.deferreds;

            handle(deferreds, value);
            return ;
        }

        _self.status = 1;
        _self.value = value;

        setTimeout(() => {

            _self.deferreds.forEach((deferred) => {
                handle(deferred);
            })

        })
    }

    function reject(reason) {

        if (_self.status !== 0) return;

        _self.status = 2;
        _self.value = reason;

        setTimeout(() => {   
            _self.deferreds.forEach((deferred) => {
                handle(deferred);
            })
        })
    }

    function handle(handler) {
        if (_self.status === 0) {
            _self.deferreds.push(handler);
            return;
        }
        
    
        let cb = _self.status === 1 ? handler.onResolved : handler.onRejected;
    
        if (cb === null) {
            cb = _self.status === 1 ? handler.resolve : handler.reject;
    
            cb(_self.value)
            return;
        }
    
        const result = cb(_self.value);
        handler.resolve(result);
        
        // if (promise.status === 1) {
        //     deferred.resolve(result);
        // } else {
        //     deferred.reject(result);
        // }
    
    }

    executor(resolve, reject);

}

export { CPromise };
