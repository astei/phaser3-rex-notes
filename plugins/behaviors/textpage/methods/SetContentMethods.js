import TextToLines from "./TextToLines";

var GetString = function (text) {
    if (Array.isArray(text)) {
        text = text.join('\n');
    } else if (typeof (text) === 'number') {
        text = text.toString();
    }
    return text;
}

export default {
    clearContent() {
        this.sections.length = 0;
        this.pageStartIndexes.length = 0;
        this.lines.length = 0;

        return this;
    },

    appendPage(text) {
        var pageStartIndex = this.totalLinesCount;

        this.sections.push(GetString(text));
        var text = this.sections.join('\n');
        this.lines = TextToLines(this.parent, text, this.lines);

        var newLinesCount = this.totalLinesCount - pageStartIndex;
        var pageCount = Math.ceil(newLinesCount / this.pageLinesCount);
        for (var i = 0; i < pageCount; i++) {
            this.pageStartIndexes.push(
                pageStartIndex + (i * this.pageLinesCount)
            );
        }

        return this;
    },

    setText(text, resetPageIdx) {
        if (resetPageIdx === undefined) {
            resetPageIdx = true;
        }

        if (resetPageIdx) {
            this.resetPageIdx();
        }

        this.clearContent();

        var sections = GetString(text).split(this.pageBreak);
        for (var i = 0, cnt = sections.length; i < cnt; i++) {
            this.appendPage(sections[i]);
        }

        return this;
    },

    appendText(text) {
        var content = this.content + GetString(text);
        this.setText(content, false);
        return this;
    },


}