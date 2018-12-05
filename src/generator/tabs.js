export default function breakToTabs(inputs) {

  // Check is we need to break by tabs (at least on field has "tab" property
  let isTabs = false;
  for (let input of inputs) {
    if (input.hasOwnProperty('tab')) {
      isTabs = true;
      break;
    }
  }
  if (!isTabs) {
    return null;
  }
  console.log("Found tabs");
  const tabs = {};
  for (let input of inputs) {
    const tabName = input.tab || 'Main';
    console.debug(input.name + " is in tab " + tabName);
    let tab = tabs[tabName];
    if (!tab) {
      tab = { label: tabName, inputs: [] };
      tabs[tabName] = tab;
    }
    tab.inputs.push(input);
  }
  const result = Object.values(tabs);
  if (!result || !result.length) {
    return null;
  }
  return result;
}
