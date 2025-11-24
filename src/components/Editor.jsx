const Editor = ({value, setValue}) => {

  const handleKeyDown = (event) => {
    // Tabキーが押され、かつCtrl/Alt/Shiftキーが同時に押されていないことを確認
    if (
      event.key === "Tab" &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.shiftKey
    ) {
      event.preventDefault(); // ブラウザのデフォルトのフォーカス移動動作を無効化

      const { selectionStart, selectionEnd, value } = event.target;

      // 現在のカーソル位置にタブ文字を挿入
      const newValue =
        value.substring(0, selectionStart) +
        "\t" +
        value.substring(selectionEnd);

      // 新しい値でstateを更新
      setValue(newValue);

      // カーソル位置をタブ文字の直後に移動させる
      // 注意: Reactのstate更新は非同期のため、setTimeoutで実行するか、
      // useRefなどを使って要素に直接アクセスし、更新後のDOMに対してキャレット位置を設定する必要があります。
      // より堅牢な方法として、ここではDOM要素のプロパティを直接操作する方法を採用します。
      // Reactでは非推奨の場合もありますが、このケースでは一般的です。
      event.target.selectionStart = event.target.selectionEnd =
        selectionStart + 1;
    }
  };

  return (
    <>
      <textarea
        onKeyDown={handleKeyDown}
        className="focus:outline-none w-full text-lg outline-none min-h-128 resize-none"
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
        rows={12}
      />
    </>
  );
};

export default Editor;
