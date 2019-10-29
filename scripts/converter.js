/**
 * The filesrc/index.ts was derived from the package https://github.com/orling/grapheme-splitter
 */

const ifTemplate = (condition, category) => `
 if(
   ${condition}
 ){
   return ${category};
 }`;

const conditionExpressionTemplate = (condition, comment, isLast) => `${condition}${isLast ? "" : " ||"} //${comment}`;

const conditionTemplate = (codepoints) => {
    if (codepoints.length === 1) {
        return `0x${codepoints[0]} === code`
    } else if (codepoints.length === 2) {
        return `(0x${codepoints[0]} <= code && code <= 0x${codepoints[1]})`
    }
    throw new Error(`Unexpected codepoints length: ${codepoints.length}`);
};

function processOneProperty(preDefinedClassifier, lines, categoryFilter) {
    const category = lines[0].split(";")[1].split("#")[0].trim();
    if (!categoryFilter(category)) {
        return "";
    }

    if (lines.length > 8) {
        const codes = [];
        for (let i = 0; i < lines.length; i++) {
            const [codepointRange, others] = lines[i].split(";");
            const codepoints = codepointRange.trimRight().split("..");

            if (codepoints.length === 1) {
                codes.push(`0x${codepoints[0]}`, `0x${codepoints[0]}`);
            } else {
                codes.push(`0x${codepoints[0]}`, `0x${codepoints[1]}`);
            }
        }

        preDefinedClassifier.push(`const ${category}Classifier = new MarkClassifier([${codes.join(", ")}]);`)
        return ifTemplate(`${category}Classifier.match(code)`, category);
    } else {
        const codes = [];
        for (let i = 0; i < lines.length; i++) {
            const isLast = (i === lines.length - 1);
            const [codepointRange, others] = lines[i].split(";");
            const codepoints = codepointRange.trimRight().split("..");
            const comment = others.split("#")[1];
            codes.push(
                conditionExpressionTemplate(
                    conditionTemplate(codepoints),
                    comment,
                    isLast
                )
            )
        }
        return ifTemplate(codes.join("\n"), category);
    }
}

function splitPropertyChunk(content) {
    const chunks = [];
    let previousLineStartsWithCodepoint = false;
    for (const line of content.split("\n")) {
        if (/^[0-9A-F]/.test(line)) {
            if (!previousLineStartsWithCodepoint) {
                chunks.push([]);
                previousLineStartsWithCodepoint = true;
            }
            chunks[chunks.length - 1].push(line);
        } else {
            previousLineStartsWithCodepoint = false;
        }
    }
    return chunks;
}

function convert(content, categoryFilter = () => true) {
    const propertyChunks = splitPropertyChunk(content);
    const preDefinedClassifiers = [];
    const matchBlocks = propertyChunks.map((chunk) => processOneProperty(preDefinedClassifiers, chunk, categoryFilter)).join("");
    return {
        matchBlocks,
        preDefinedClassifiers
    }
}

module.exports = convert;