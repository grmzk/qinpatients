function getDiaryToday() {
  const today = new Date();
  if (today.getHours() < 8) {
    today.setDate(today.getDate() - 1);
  }
  let yyyy = today.getFullYear();
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default getDiaryToday;
