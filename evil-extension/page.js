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
    if(node.nodeName === "#text"){
        // console.log(node);
        node.nodeValue = node.nodeValue.split(" ")
                                    .map((text)=>{
                                        if (!text.trim()) return text;
                                        // console.log("text =" + text);
                                        if(text[text.length-1] == '\n'){
                                            tmp = text.substr(0,text.length-1);
                                            return MATCH_LIST[tmp]?`${MATCH_LIST[tmp]}\n`:text;
                                        }else{
                                            return MATCH_LIST[tmp]?`${MATCH_LIST[tmp]}`:text;
                                        }
                                        // return text;
                                    })
                                    .join(" ");
        // console.log(node);
    }else{
        node.childNodes.forEach((n)=>{
            transformTextNodes(n);
        })
    }
}

transformTextNodes(document.body);

// Log statement to test that the extension loaded properly.
console.log('Evil extension loaded!');
