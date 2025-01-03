var TemplateEngine = function (html: string, options: Object) {
  var re = /<%([^%>]+)?%>/g,
    reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
    code = "var r=[];\\n",
    cursor = 0,
    match;
  var add = function (line: string, js = false) {
    js ? (code += line.match(reExp) ? line + "\\n" : "r.push(" + line + ");\\n") : (code += line != "" ? 'r.push("' + line.replace(/"/g, '\\\\"') + '");\\n' : "");
    return add;
  };
  while ((match = re.exec(html))) {
    add(html.slice(cursor, match.index))(match[1], true);
    cursor = match.index + match[0].length;
  }
  add(html.substr(cursor, html.length - cursor));
  code += 'return r.join("");';
  console.log(code);
  console.log("================");
  console.log(code.replace(/\\[rtn]/g, ""));
  return new Function(code.replace(/\\[rtn]/g, "")).apply(options);
};

// var template = `Hello, my name is <%this.name%>. I'm <%this.profile.age%> years old.`;

// console.log(
//   TemplateEngine(template, {
//     name: "Krasimir",
//     profile: {
//       age: 29,
//     },
//   })
// );

var template = `My skills:<%if(this.showSkills){%>
<%for(var index in this.skills) {%>
<a href="#">
<%this.skills[index]%>
</a><%}%><%} else {%><p>none</p><%}%>`;

console.log(
  TemplateEngine(template, {
    skills: ["js", "html", "css"],
    showSkills: true,
  })
);
