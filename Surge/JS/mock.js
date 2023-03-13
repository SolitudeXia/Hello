# > copy自githubdulong

function getRegexp(re_str) {
	let regParts = re_str.match(/^\/(.*?)\/([gims]*)$/);
	if (regParts) {
		return new RegExp(regParts[1], regParts[2]);
	} else {
		return new RegExp(re_str);
	}
}
String.prototype.replaceAll = function(s1, s2) {
  return this.replace(new RegExp(s1, "gm"), s2);
}
let body;
if (typeof $argument == "undefined") {
	console.log("requires $argument");
} else {
	$argument = $argument.replaceAll("，，", ",")
	console.log($argument);
	if ($script.type === "http-response") {
		body = $response.body;
	} else if ($script.type === "http-request") {
		body = $request.body;
	} else {
		console.log("script type error");
	}
}

console.log($script.type)

if (body) {
	$argument.split("&").forEach((item) => {
		if (item) {
			try {
				let [match, replace] = item.split("->");
				let re = getRegexp(match);
				body = body.replaceAll(re, replace);
			} catch (e) {
				console.error(item)
				console.error(e)
			}
		}
	});
	$done({ body });
} else {
	console.log("Not Modify");
	$done({});
}
