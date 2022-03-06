pub struct StrSplit<'a> {
    // 剩余字符
    remainder: &'a str,
    // 分隔符
    delimiter: &'a str,
}

impl<'a> StrSplit<'a> {
    pub fn new(haystack: &'a str, delimiter: &'a str) -> Self {
        Self {
            remainder: haystack,
            delimiter,
        }
    }
}

impl<'a> Iterator for StrSplit<'a> {
    type Item = &'a str;
    fn next(&mut self) -> Option<Self::Item> {
        if let Some(next_delim) = self.remainder.find(self.delimiter) {
            let until_delimiter = &self.remainder[..next_delim];
            self.remainder = &self.remainder[next_delim + self.delimiter.len()..];
            Some(until_delimiter)
        } else if self.remainder.is_empty() {
            None
        } else {
            let rest = self.remainder;
            // &'a str       &'static str
            self.remainder = "";
            Some(rest)
        }
    }
}

#[cfg(test)]
mod tests {
    use super::StrSplit;

    #[test]
    fn test_str_split() {
        let haystack = "a,b,c,d,e";
        let delimiter = ",";
        let letters = StrSplit::new(haystack, delimiter);

        assert!(letters.eq(vec!["a", "b", "c", "d", "e"].into_iter()));
    }
}
