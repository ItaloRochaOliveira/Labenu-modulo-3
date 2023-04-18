//pai/superClass
abstract class Message {
  constructor(
    protected id: string,
    protected sendId: string,
    protected chatId: string,
    protected content: string
  ) {}
  public send(): void {}
}

class TextMesage extends Message {
  constructor(id: string, sendId: string, chatId: string, content: string) {
    super(id, sendId, chatId, content); //conector com o pai, os valores vem aqui e vão ser guardada no padrao do pai
  }
  public send(): void {}
}

const textMesage = new TextMesage("m001", "u001", "u002", "me manda um vídeo");
console.log(textMesage);

class VideoMesage extends Message {
  constructor(
    id: string,
    sendId: string,
    chatId: string,
    content: string,

    private video: string
  ) {
    super(id, sendId, chatId, content); //conector com o pai, os valores vem aqui e vão ser guardada no padrao do pai
  }

  private upload() {
    //faz upload
  }
  public send(): void {
    this.upload();
    //depois envia a mensagem
  }
}

const newVideo = new VideoMesage("m001", "u002", "u002", "é para já!", "video");
console.log(newVideo);
