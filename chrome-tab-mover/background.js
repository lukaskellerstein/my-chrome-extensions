chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;

  if (command === "move-tab-left" && tab.index > 0) {
    await chrome.tabs.move(tab.id, { index: tab.index - 1 });
  } else if (command === "move-tab-right") {
    await chrome.tabs.move(tab.id, { index: tab.index + 1 });
  } else if (command === "select-tab-left" || command === "select-tab-right") {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    if (tabs.length < 2) return;
    tabs.sort((a, b) => a.index - b.index);
    const delta = command === "select-tab-left" ? -1 : 1;
    const newIndex = (tab.index + delta + tabs.length) % tabs.length;
    await chrome.tabs.update(tabs[newIndex].id, { active: true });
  }
});
