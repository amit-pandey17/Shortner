## URL shortener
This is your run of the mill url shortening service.
### How to run this?
1. fork/download this repository, make sure you have a healthy mongo install in your system natively.
2. go to the terminal and do: <code>npm start</code> 
3. Open your browser to localhost:5650 if it doesn't pop up on its own. 
4. Paste in your URL, click on shorten, have fun!

**libraries used**
1. To shorten the URL, I have employed shortid: https://www.npmjs.com/package/shortid, shoutout to Dylan Greene!
2. I used mongoose to create my DB schema
3. Used EJS as usual for displaying the node behaviour at front end. 
4. I used http-errors: the lifesaver for this project handles the errors like a charm.https://www.npmjs.com/package/http-errors, shoutout to Douglas Wilson! 

This is the exercise I attempted after I did the remaining 2 assignments. It took me a lot of time on this mostly because the Mongo in my system was acting weird and I had to brew install it a couple of times before realizing that there has to be a configuration done manually with <code>sudo mkdir -p /data/bin</code> only to realize that I don't have the permission to access this(I could not find the answer to how you chmod the system owner to user owner privilege). Finally I did: 
<code>brew services start mongodb-community@4.4</code>. 
This was nothing short of miracle. Worked like a charm!
I would definitely say this was one of the challenging part of the assignment and I got my skills brushed up. Never used mongo and Node as extensively as I did in this project. Thanks again to the Rethink engineering team!
