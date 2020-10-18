const html =
  "<p class='haha' data-code='123'>可以用 <code>v-on</code> 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。</p>" +
  "<p>示例：</p>" +
  '<pre><code class="hljs html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example-1"</span>&gt;</span>\n' +
  '  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"counter += 1"</span>&gt;</span>Add 1<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>\n' +
  '  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>The button above has been clicked {{ counter }} times.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>\n' +
  '<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>';

const reg = /<p.*?>(.*?)<\/p>/g;

console.log(html.match(reg).map(item => item.replace(/<p.*?>|<\/p>/g, "")));
