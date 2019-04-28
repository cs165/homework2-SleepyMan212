const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE'
};

  // TODO(you): Implement this function! See HW spec for details.
function transformTextNodes(node) {
    node.childNodes.forEach((n)=>{
        console.log(n);
        if(n.nodeName === "#text"){
            console.log(n.nodeValue);
            n.nodeValue = n.nodeValue.split(" ")
                                        .map((text)=>{
                                            if (!text.trim()) return text;
                                            // console.log("text =" + text);
                                            if(text[text.length-1] == '\n'){
                                                tmp = text.substr(0,text.length-1);
                                                return MATCH_LIST[tmp]?`${MATCH_LIST[tmp]}\n`:text;
                                            }else{
                                                tmp = text;
                                                return MATCH_LIST[tmp]?`${MATCH_LIST[tmp]}`:text;
                                            }
                                        })
                                        .join(" ");
            // console.log(node);
        }else{
            transformTextNodes(n);
        }
    })
}

transformTextNodes(document.body);

// Log statement to test that the extension loaded properly.
console.log('Evil extension loaded!');
