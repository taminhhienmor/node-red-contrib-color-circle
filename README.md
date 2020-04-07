<p>Color Circle</p>
<p>Input Parameters:
    <ul>
        <li><b>Value</b> - The range value is 0 ~ 1.0 <b>Value</b> property or the <code>msg.[name]</code> property</li>
        <li><b>gain</b> - The value of gain. The default value of gain is 10. The gain is taken from the <code>msg.gain</code> property</li>
        <li><b>offset_x</b> - The value of offset_x. The default value of offset_x is 0.2. The gain is taken from the <code>msg.offset_x</code> property</li>
        <li><b>offset_green</b> - The value of offset_green. The default value of offset_x is 0.6. The gain is taken from the <code>msg.offset_green</code> property</li>
    </ul>
</p>
<p>Return values:
    <ul>
        <li><b>payload</b> Will either be details for color or provide an error state</li>
    </ul>
</p>
![colorCircle](https://cdn.jsdelivr.net/gh/taminhhienmor/node-red-contrib-color-circle/source/image/colorCircle.png)
``` node
[{"id":"27add2f7.f9d87e","type":"inject","z":"699aba61.1a36d4","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":200,"y":140,"wires":[["2363c183.e8b41e"]]},{"id":"5b72b364.e3fdac","type":"debug","z":"699aba61.1a36d4","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":710,"y":140,"wires":[]},{"id":"2363c183.e8b41e","type":"colorCircle","z":"699aba61.1a36d4","property":"1","propertyType":"str","x":470,"y":140,"wires":[["5b72b364.e3fdac"]]}]
```