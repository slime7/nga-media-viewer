// ==UserScript==
// @name         nga-video
// @namespace    https://github.com/slime7
// @version      0.1
// @description  查看附件中的视频文件。
// @author       Slime7
// @downloadURL  https://github.com/slime7/nga-media-viewer/raw/master/nga-media-viewer.user.js
// @homepageURL  https://github.com/slime7/nga-media-viewer
// @match        *://bbs.nga.cn/read.php*
// @match        *://bbs.ngacn.cc/read.php*
// @match        *://nga.178.com/read.php*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  //获取帖子中的附件列表
  var attachments = [].slice.call(document.querySelectorAll('[id^="postattach"]') || []), attIndex;
  for (attIndex in attachments) {
    //获取附件中的媒体文件列表
    var mp4Selector = 'a[href$=".MP4"], a[href$=".Mp4"], a[href$=".mP4"], a[href$=".mp4"]';
    try {
      var medias = [].slice.call(attachments[attIndex].querySelectorAll(mp4Selector) || []), mediaIndex;
    } catch (e) {
      return;
    }
    for (mediaIndex in medias) {
      var winButton = document.createElement('a');
      var mp4Link = medias[mediaIndex];
      var mp4Src = mp4Link.getAttribute('href');
      var buttonClickFun = function (src) {
        return function () {
          console.log(src);
          commonui.createadminwindow();
          commonui.adminwindow._.addContent(null);
          commonui.adminwindow._.addContent('<video controls="" autoplay="" name="media"><source src="' + src + '" type="video/mp4"></video>');
          commonui.adminwindow._.show();
        }
      };
      winButton.innerText = '+';
      winButton.setAttribute('class', 'small_colored_text_btn stxt white right');
      winButton.setAttribute('href', 'javascript:void(0)');
      winButton.addEventListener('click', buttonClickFun(mp4Src));
      mp4Link.parentNode.insertBefore(winButton, mp4Link);
    }
  }
})();
