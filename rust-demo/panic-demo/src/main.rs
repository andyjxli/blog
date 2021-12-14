use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt");
    let new_f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(err) => panic!("Error creating file: {:?}", err),
            },
            error_others => panic!("Error opening the file: {:?}", error_others),
        },
    };

    let wrap_f = File::open("hello.txt").unwrap();
    let exptct_f = File::open("hello.txt").expect("无法打开文件");
}
